declare module '*.module.css' {
    const content: { [key: string]: any };
    export default content;
}

declare module '*.module.less' {
    const content: { [key: string]: any };
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}
