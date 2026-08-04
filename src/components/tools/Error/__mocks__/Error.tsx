const ErrorMock = ({
    detail,
    metaDescription,
    pageTitle,
    statusCode,
    title,
    code,
    kind,
    stripLabel,
    primaryAction,
    secondaryAction,
    linksLabel,
    links,
    safety,
}: {
    readonly detail?: string;
    readonly metaDescription?: string;
    readonly pageTitle: string;
    readonly statusCode: number;
    readonly title: string;
    readonly code?: string;
    readonly kind?: string;
    readonly stripLabel?: string;
    readonly primaryAction?: { labelKey: string; to?: string };
    readonly secondaryAction?: { labelKey: string; to?: string };
    readonly linksLabel?: string;
    readonly links?: readonly { labelKey: string; to: string }[];
    readonly safety?: { messageKey: string };
}) => (
    <div>
        <span data-testid="detail">{detail}</span>
        <span data-testid="metaDescription">{metaDescription}</span>
        <span data-testid="pageTitle">{pageTitle}</span>
        <span data-testid="statusCode">{statusCode}</span>
        <span data-testid="title">{title}</span>
        <span data-testid="code">{code}</span>
        <span data-testid="kind">{kind}</span>
        <span data-testid="stripLabel">{stripLabel}</span>
        <span data-testid="primaryActionLabel">{primaryAction?.labelKey}</span>
        <span data-testid="primaryActionTo">{primaryAction?.to}</span>
        <span data-testid="secondaryActionLabel">{secondaryAction?.labelKey}</span>
        <span data-testid="secondaryActionTo">{secondaryAction?.to}</span>
        <span data-testid="linksLabel">{linksLabel}</span>
        <span data-testid="links">{links?.map((link) => link.labelKey).join(',')}</span>
        <span data-testid="safety">{safety?.messageKey}</span>
    </div>
);

export default ErrorMock;
