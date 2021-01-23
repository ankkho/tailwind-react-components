import React from 'react';
import Link from 'next/link';

import { LoaderIcon } from '../../../utils/common';

const activeClass = (href: string) => {
	if (typeof window === 'undefined') return null;
	return (
		window.location.pathname === href &&
		'text-blue-700 font-semibold bg-blue-100'
	);
};

export interface links {
	label: string;
	href: string;
	key?: string;
}

export interface containerProps {
	title: string;
	links: links[];
}

interface SideNavProps {
	loading: boolean;
	containerLinks: containerProps[];
	otherLinks: links[];
}

export const ReturnLink: React.FC<links> = ({
	label,
	href,
	key,
}): React.ReactElement => (
	<Link href={href} key={`link-${key}`}>
		<a>
			<div
				className={`font-semibold cursor-pointer pl-5 p-3 capitalize ${activeClass(
					{ href }
				)} hover:bg-blue-100`}>
				{label}
			</div>
		</a>
	</Link>
);

const ContainerBox: React.FC<{ details: containerProps; key: string }> = ({
	details,
	key,
}) => {
	const { title, links } = details;
	return (
		<div className='border-b' key={key}>
			<h3 className='font-bold text-gray-500 uppercase p-5'>{title}</h3>
			{links.map((val, linkKey) => {
				const { href, label } = val;

				return <ReturnLink href={href} label={label} key={`${linkKey}`} />;
			})}
		</div>
	);
};

const SideNav = (props: React.PropsWithChildren<SideNavProps>) => {
	const { children, loading, containerLinks, otherLinks } = props;

	return (
		<div className='flex'>
			<div
				className='hidden md:block border bg-white mr-5 w-1/4 h-1/2'
				style={{ height: '300px' }}>
				{containerLinks.map((val, key) => (
					<ContainerBox details={val} key={`${key}-box`} />
				))}
				{otherLinks.map((val, key) => {
					const { href, label } = val;
					return <ReturnLink href={href} label={label} key={`${key}`} />;
				})}
			</div>
			<div className='w-full'>{loading ? <LoaderIcon /> : children}</div>
		</div>
	);
};

export default SideNav;
