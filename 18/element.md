createElement<{ className: string; }, HTMLElement> (
    type: React.HTMLElementType,
    props?: (React.ClassAttributes<HTMLElement> & { className: string; }) | null | undefined,
    ...children: React.ReactNode[]
): React.DetailedReactHTMLElement<{ className: string; }, HTMLElement>
