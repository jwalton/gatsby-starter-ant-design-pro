/**
 * Join together one or more classnames.
 */
export default function classNames(
    ...names: (string | string[] | { [className: string]: any } | undefined)[]
): string {
    return names
        .flatMap(value => {
            if (typeof value === 'string') {
                return [value];
            } else if (Array.isArray(value)) {
                return value;
            } else if (typeof value === 'object') {
                return Object.keys(value).flatMap(key =>
                    value[key] ? [key] : []
                );
            } else {
                return [];
            }
        })
        .join(' ');
}
