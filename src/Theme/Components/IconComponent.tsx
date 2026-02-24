import * as React from 'react';
import { type SvgIconProps } from '@mui/material/SvgIcon';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

const IconComponent = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <UnfoldMoreRoundedIcon
        className={props.className}
        fontSize="small"
        ref={ref}
        style={props.style}
        sx={props.sx}
    />
));
IconComponent.displayName = 'SelectIcon';

export default IconComponent;
