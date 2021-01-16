import React from 'react';

interface BoxProps {
	title: React.ReactElement | string;
	children: React.ReactElement;
	className?: string;
	editClicked?: Function;
	disabled?: boolean;
}

const Box = (props: React.PropsWithChildren<BoxProps>) => {
	const { title, children, className, editClicked, disabled } = props;

	const linkText = disabled ? 'Edit' : 'Cancel';

	return (
		<div className={`border p-2 bg-white ${className} shadow`}>
			<div className='text-xl font-semibold text-gray-700 border-b p-2'>
				{title}
				{editClicked && (
					<a
						href='#'
						onClick={() => editClicked()}
						className='capitalize pl-5 text-blue-500'>
						{linkText}
					</a>
				)}
			</div>
			<div className='pt-3 text-gray-800'>{children}</div>
		</div>
	);
};

export default Box;
