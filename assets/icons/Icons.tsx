import Svg, { SvgProps, Circle, Path } from "react-native-svg";

interface CustomSvgProps extends SvgProps {
	size?: number;
}

const defaultProps = {
	strokeWidth: 1.5,
	color: "#5C5C5C",
	size: 24,
}

export const UserIcon = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props };

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
		</Svg>
	);
};

export const MailIcon = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props };

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
			<Path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const Password = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props };

	return(

		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M12 16.5V14.5"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
			<Path d="M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97626 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97626 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<Path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>

	);
};

export const BackArrowCricle = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props };

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
			<Path d="M13.5 16C13.5 16 10.5 13.054 10.5 12C10.5 10.9459 13.5 8 13.5 8"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const LeftArrow = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props };

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const Home = (props: CustomSvgProps & { size?: number }) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props };

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M9.06165 4.82633L3.23911 9.92134C2.7398 10.3583 3.07458 11.1343 3.76238 11.1343C4.18259 11.1343 4.52324 11.4489 4.52324 11.8371V15.0806C4.52324 17.871 4.52324 19.2662 5.46176 20.1331C6.40029 21 7.91082 21 10.9319 21H13.0681C16.0892 21 17.5997 21 18.5382 20.1331C19.4768 19.2662 19.4768 17.871 19.4768 15.0806V11.8371C19.4768 11.4489 19.8174 11.1343 20.2376 11.1343C20.9254 11.1343 21.2602 10.3583 20.7609 9.92134L14.9383 4.82633C13.5469 3.60878 12.8512 3 12 3C11.1488 3 10.4531 3.60878 9.06165 4.82633Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M12 16H12.009"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);

};

export const NotificationIcon = (props: CustomSvgProps & {size?: number }) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props };

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<Path d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const CirclePlusIcon = (props: CustomSvgProps & { size?: number }) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props }

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M12 8V16M16 12L8 12" stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
		</Svg>
	);
};

export const LogoutIcon = (props: CustomSvgProps & { size?: number }) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props }

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
			<Path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
	  	</Svg>
	)
};

export const EditIcon = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props }

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M11 20H17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
		</Svg>
	)
};

export const PhoneIcon = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props }

	return (

		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M5 9C5 5.70017 5 4.05025 6.02513 3.02513C7.05025 2 8.70017 2 12 2C15.2998 2 16.9497 2 17.9749 3.02513C19 4.05025 19 5.70017 19 9V15C19 18.2998 19 19.9497 17.9749 20.9749C16.9497 22 15.2998 22 12 22C8.70017 22 7.05025 22 6.02513 20.9749C5 19.9497 5 18.2998 5 15V9Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
			<Path d="M11 19H13"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M9 2L9.089 2.53402C9.28188 3.69129 9.37832 4.26993 9.77519 4.62204C10.1892 4.98934 10.7761 5 12 5C13.2239 5 13.8108 4.98934 14.2248 4.62204C14.6217 4.26993 14.7181 3.69129 14.911 2.53402L15 2"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const BookOpenIcon = (props: CustomSvgProps) => {

	const { strokeWidth, size, color, ...otherProps } = { ...defaultProps, ...props }

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M16.6127 16.0846C13.9796 17.5677 12.4773 20.6409 12 21.5V8C12.4145 7.25396 13.602 5.11646 15.6317 3.66368C16.4868 3.05167 16.9143 2.74566 17.4572 3.02468C18 3.30371 18 3.91963 18 5.15146V13.9914C18 14.6568 18 14.9895 17.8634 15.2233C17.7267 15.4571 17.3554 15.6663 16.6127 16.0846L16.6127 16.0846Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M12 7.80556C11.3131 7.08403 9.32175 5.3704 5.98056 4.76958C4.2879 4.4652 3.44157 4.31301 2.72078 4.89633C2 5.47965 2 6.42688 2 8.32133V15.1297C2 16.8619 2 17.728 2.4626 18.2687C2.9252 18.8095 3.94365 18.9926 5.98056 19.3589C7.79633 19.6854 9.21344 20.2057 10.2392 20.7285C11.2484 21.2428 11.753 21.5 12 21.5C12.247 21.5 12.7516 21.2428 13.7608 20.7285C14.7866 20.2057 16.2037 19.6854 18.0194 19.3589C20.0564 18.9926 21.0748 18.8095 21.5374 18.2687C22 17.728 22 16.8619 22 15.1297V8.32133C22 6.42688 22 5.47965 21.2792 4.89633C20.5584 4.31301 19 4.76958 18 5.5"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export const CameraIcon = (props: CustomSvgProps) => {

	const { strokeWidth, size, color, ...otherProps } = { ...defaultProps, ...props }

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M7.00018 6.00055C5.77954 6.00421 5.10401 6.03341 4.54891 6.2664C3.77138 6.59275 3.13819 7.19558 2.76829 7.96165C2.46636 8.58693 2.41696 9.38805 2.31814 10.9903L2.1633 13.501C1.91757 17.4854 1.7947 19.4776 2.96387 20.7388C4.13303 22 6.10271 22 10.0421 22H13.9583C17.8977 22 19.8673 22 21.0365 20.7388C22.2057 19.4776 22.0828 17.4854 21.8371 13.501L21.6822 10.9903C21.5834 9.38805 21.534 8.58693 21.2321 7.96165C20.8622 7.19558 20.229 6.59275 19.4515 6.2664C18.8964 6.03341 18.2208 6.00421 17.0002 6.00055"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
			<Path d="M17 7L16.1142 4.78543C15.732 3.82996 15.3994 2.7461 14.4166 2.25955C13.8924 2 13.2616 2 12 2C10.7384 2 10.1076 2 9.58335 2.25955C8.6006 2.7461 8.26801 3.82996 7.88583 4.78543L7 7"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M15.5 14C15.5 15.933 13.933 17.5 12 17.5C10.067 17.5 8.5 15.933 8.5 14C8.5 12.067 10.067 10.5 12 10.5C13.933 10.5 15.5 12.067 15.5 14Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<Path d="M11.9998 6H12.0088" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
		</Svg>

	)
};

export const AddressIcon = (props: CustomSvgProps) => {

	const { strokeWidth, size, color, ...otherProps } = { ...defaultProps, ...props }

	return (

		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<Path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
		</Svg>
	)
}

export const ImageIcon = (props: CustomSvgProps) => {

	const { strokeWidth, size, color, ...otherProps } = { ...defaultProps, ...props }

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
			<Circle cx="16.5" cy="7.5" r="1.5"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<Path d="M16 22C15.3805 19.7749 13.9345 17.7821 11.8765 16.3342C9.65761 14.7729 6.87163 13.9466 4.01569 14.0027C3.67658 14.0019 3.33776 14.0127 3 14.0351"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
			<Path d="M13 18C14.7015 16.6733 16.5345 15.9928 18.3862 16.0001C19.4362 15.999 20.4812 16.2216 21.5 16.6617"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
		</Svg>
	)
};


export const VideoIcon = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props };

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M17.7001 21.3351C16.5281 21.4998 14.9996 21.4998 12.9501 21.4998H11.0501C7.01955 21.4998 5.0043 21.4998 3.75218 20.2476C2.50006 18.9955 2.50006 16.9803 2.50006 12.9498V11.0498C2.50006 7.01925 2.50006 5.00399 3.75218 3.75187C5.0043 2.49976 7.01955 2.49976 11.0501 2.49976H12.9501C16.9806 2.49976 18.9958 2.49976 20.2479 3.75187C21.5001 5.00399 21.5001 7.01925 21.5001 11.0498V12.9498C21.5001 14.158 21.5001 15.1851 21.4663 16.0648C21.4393 16.7699 21.4258 17.1224 21.1588 17.2541C20.8918 17.3859 20.5932 17.1746 19.9958 16.752L18.6501 15.7998"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
				/>
			<Path d="M14.9453 12.3948C14.7686 13.0215 13.9333 13.4644 12.2629 14.3502C10.648 15.2064 9.8406 15.6346 9.18992 15.4625C8.9209 15.3913 8.6758 15.2562 8.47812 15.07C8 14.6198 8 13.7465 8 12C8 10.2535 8 9.38018 8.47812 8.92995C8.6758 8.74381 8.9209 8.60868 9.18992 8.53753C9.8406 8.36544 10.648 8.79357 12.2629 9.64983C13.9333 10.5356 14.7686 10.9785 14.9453 11.6052C15.0182 11.8639 15.0182 12.1361 14.9453 12.3948Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

export const DeleteIcon = (props: CustomSvgProps) => {

	const { strokeWidth, color, size, ...otherProps } = { ...defaultProps, ...props }

	return (
		<Svg viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" {...props}>
			<Path d="M15 9L9 14.9996M15 15L9 9.00039"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
		</Svg>
	)
}