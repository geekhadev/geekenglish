import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-language"
            {...props}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 5h7" />
            <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
            <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
            <path d="M12 20l4 -9l4 9" />
            <path d="M19.1 18h-6.2" />
        </svg>
    );
}
