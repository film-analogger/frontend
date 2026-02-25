import React from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router';

const LinkBehavior = React.forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, 'to'> & { readonly href: RouterLinkProps['to'] }
>((props, ref) => {
    const { href, children, className, style, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return (
        <RouterLink
            {...other}
            className={className}
            ref={ref}
            style={style}
            to={href}
        >
            {children}
        </RouterLink>
    );
});

LinkBehavior.displayName = 'LinkBehavior';
export default LinkBehavior;
