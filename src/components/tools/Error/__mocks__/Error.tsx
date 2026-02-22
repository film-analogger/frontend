const ErrorMock = ({
    detail,
    metaDescription,
    pageTitle,
    statusCode,
    title,
}: {
    readonly detail: string;
    readonly metaDescription: string;
    readonly pageTitle: string;
    readonly statusCode: number;
    readonly title: string;
}) => (
    <div>
        <span data-testid="detail">{detail}</span>
        <span data-testid="metaDescription">{metaDescription}</span>
        <span data-testid="pageTitle">{pageTitle}</span>
        <span data-testid="statusCode">{statusCode}</span>
        <span data-testid="title">{title}</span>
    </div>
);

export default ErrorMock;
