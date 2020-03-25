/* eslint-disable jsx-a11y/click-events-have-key-events */
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable, {
    ActionType,
    enUSIntl,
    IntlProvider,
    ProColumns,
} from '@ant-design/pro-table';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import CreateForm from '../components/List/CreateForm';
import { TableListItem } from '../components/List/types';
import UpdateForm, { FormValueType } from '../components/List/UpdateForm';
import { addRule, queryRule, removeRule, updateRule } from '../lib/listService';

/**
 * Add node
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
    const hide = message.loading('Adding');
    try {
        await addRule({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Add failed, please try again!');
        return false;
    }
};

/**
 * Update node
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
        await updateRule({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        hide();

        message.success('Configuration succeeded');
        return true;
    } catch (error) {
        hide();
        message.error('Configuration failed.  Please try again.');
        return false;
    }
};

/**
 *  Remove node
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
    const hide = message.loading('Deleting');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map(row => row.key),
        });
        hide();
        message.success('Deleted successfully, refreshing soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed.  Please try again.');
        return false;
    }
};

const TableList: React.FC<{}> = () => {
    const [sorter, setSorter] = useState<string>('');
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(
        false
    );
    const [stepFormValues, setStepFormValues] = useState({});
    const actionRef = useRef<ActionType>();
    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'Rule name',
            dataIndex: 'name',
            rules: [
                {
                    required: true,
                    message: 'Rule name is required',
                },
            ],
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            valueType: 'textarea',
        },
        {
            title: 'Number of service calls',
            dataIndex: 'callNo',
            sorter: true,
            hideInForm: true,
            renderText: (val: string) => `${val} K`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
                0: { text: 'Default', status: 'Default' },
                1: { text: 'Processing', status: 'Processing' },
                2: { text: 'Success', status: 'Success' },
                3: { text: 'Error', status: 'Error' },
            },
        },
        {
            title: 'Last scheduled time',
            dataIndex: 'updatedAt',
            sorter: true,
            valueType: 'dateTime',
            hideInForm: true,
        },
        {
            title: 'Operating',
            dataIndex: 'option',
            valueType: 'option',
            render: function Operating(_, record) {
                return (
                    <>
                        <a
                            tabIndex={0}
                            role="button"
                            onClick={() => {
                                handleUpdateModalVisible(true);
                                setStepFormValues(record);
                            }}
                            href="#config"
                        >
                            Configuration
                        </a>
                        <Divider type="vertical" />
                        <a href="#subscribe">Subscribe to alerts</a>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <IntlProvider value={enUSIntl}>
                <ProTable<TableListItem>
                    headerTitle="Inquiry form"
                    actionRef={actionRef}
                    rowKey="key"
                    onChange={(_, _filter, _sorter) => {
                        const sorterResult = _sorter as SorterResult<
                            TableListItem
                        >;
                        if (sorterResult.field) {
                            setSorter(
                                `${sorterResult.field}_${sorterResult.order}`
                            );
                        }
                    }}
                    params={{
                        sorter,
                    }}
                    toolBarRender={(action, { selectedRows }) => [
                        <Button
                            type="primary"
                            key="primary"
                            onClick={() => handleModalVisible(true)}
                        >
                            <PlusOutlined /> New
                        </Button>,
                        selectedRows && selectedRows.length > 0 && (
                            <Dropdown
                                overlay={
                                    <Menu
                                        onClick={async e => {
                                            if (e.key === 'remove') {
                                                await handleRemove(
                                                    selectedRows
                                                );
                                                action.reload();
                                            }
                                        }}
                                        selectedKeys={[]}
                                    >
                                        <Menu.Item key="remove">
                                            Batch deletion
                                        </Menu.Item>
                                        <Menu.Item key="approval">
                                            Batch approval
                                        </Menu.Item>
                                    </Menu>
                                }
                            >
                                <Button>
                                    Batch operation <DownOutlined />
                                </Button>
                            </Dropdown>
                        ),
                    ]}
                    tableAlertRender={(selectedRowKeys, selectedRows) => (
                        <div>
                            Chosen{' '}
                            <a style={{ fontWeight: 600 }} href="#chosen">
                                {selectedRowKeys.length}
                            </a>{' '}
                            item&nbsp;&nbsp;
                            <span>
                                Total number of service calls{' '}
                                {selectedRows.reduce(
                                    (pre, item) => pre + item.callNo,
                                    0
                                )}{' '}
                                K
                            </span>
                        </div>
                    )}
                    request={params => queryRule(params)}
                    columns={columns}
                    rowSelection={{}}
                />
                <CreateForm
                    onCancel={() => handleModalVisible(false)}
                    modalVisible={createModalVisible}
                >
                    <ProTable<TableListItem, TableListItem>
                        onSubmit={async value => {
                            const success = await handleAdd(value);
                            if (success) {
                                handleModalVisible(false);
                                if (actionRef.current) {
                                    actionRef.current.reload();
                                }
                            }
                        }}
                        rowKey="key"
                        type="form"
                        columns={columns}
                        rowSelection={{}}
                    />
                </CreateForm>
                {stepFormValues && Object.keys(stepFormValues).length ? (
                    <UpdateForm
                        onSubmit={async value => {
                            const success = await handleUpdate(value);
                            if (success) {
                                handleUpdateModalVisible(false);
                                setStepFormValues({});
                                if (actionRef.current) {
                                    actionRef.current.reload();
                                }
                            }
                        }}
                        onCancel={() => {
                            handleUpdateModalVisible(false);
                            setStepFormValues({});
                        }}
                        updateModalVisible={updateModalVisible}
                        values={stepFormValues}
                    />
                ) : null}
            </IntlProvider>
        </>
    );
};

export default TableList;
