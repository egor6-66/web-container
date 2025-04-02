import React from 'react';

import { IProps } from './interfaces';

const Icons = (props: IProps) => {
    const { icon, text } = props;

    switch (icon) {
        case 'arrow':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <g id="Page-1" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                        <g id="Core" fill="#000" transform="translate(-424 -4)">
                            <g id="arrow-back" transform="translate(424 4)">
                                <path fill={'var(--text-primary)'} id="Shape" d="M16 7H3.8l5.6-5.6L8 0 0 8l8 8 1.4-1.4L3.8 9H16z"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            );

        case 'file':
            return (
                <div style={{ position: 'relative' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="42" preserveAspectRatio="xMidYMid" viewBox="0 0 49 64">
                        <path
                            fill="#192257"
                            fillRule="evenodd"
                            d="M49 16.842v42.105C49 61.738 46.73 64 43.931 64H5.069C2.269 64 0 61.738 0 58.947V5.053C0 2.262 2.269 0 5.069 0h27.034z"
                        ></path>
                        <path fill="#69d8f0" fillRule="evenodd" d="M49 15.899v2.096H35.187c-2.86 0-4.179-2.32-4.179-5.181V0H33.1z"></path>
                    </svg>
                    <div
                        style={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: 10,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {text?.toUpperCase()}
                    </div>
                </div>
            );

        case 'folder_with_content':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42">
                    <g id="surface1">
                        <path
                            fill="#2980B9"
                            d="M3.5 8.75a3.507 3.507 0 0 0-3.5 3.5v24.5c0 1.922 1.566 3.5 3.5 3.5h35c1.934 0 3.5-1.578 3.5-3.5v-24.5c0-1.922-1.566-3.5-3.5-3.5Zm0 0"
                        ></path>
                        <path
                            fill="#2980B9"
                            d="M5.25 1.75a3.507 3.507 0 0 0-3.5 3.5v24.5c0 1.922 1.566 3.5 3.5 3.5h31.5c1.934 0 3.5-1.578 3.5-3.5v-21c0-1.922-1.566-3.5-3.5-3.5h-14l-5.25-3.5Zm0 0"
                        ></path>
                        <path fill="#BDC3C7" d="M40.25 24.5v-14c0-1.922-1.566-3.5-3.5-3.5H5.25a3.507 3.507 0 0 0-3.5 3.5v14Zm0 0"></path>
                        <path
                            fill="#3498DB"
                            d="M3.5 8.75a3.507 3.507 0 0 0-3.5 3.5V35c0 1.922 1.566 3.5 3.5 3.5h35c1.934 0 3.5-1.578 3.5-3.5V12.25c0-1.922-1.566-3.5-3.5-3.5Zm0 0"
                        ></path>
                        <path
                            fill="#2980B9"
                            d="M13.563 12.25c-.364 0-.676 0-.93.352-.254.171-.383.523-.383.875v20.125c0 .351.129.695.383.875q.382.525.93.523h16.624q.547.002.93-.523c.254-.18.383-.524.383-.875v-14c0-.352-.09-.704-.273-1.227a8 8 0 0 0-.657-1.047l-4.265-4.203c-.254-.352-.602-.523-1.04-.703-.437-.172-.84-.172-1.203-.172ZM14 14h8.75v5.602c0 .351.129.695.383.875q.383.525.93.523h5.687v12.25H14Zm10.5 0c.266.172.438.172.547.352l4.265 4.195c.11.18.239.351.329.703H24.5Zm-8.312 8.75h-.329c-.082.172-.109.172-.109.352v.875c0 .171.027.351.11.351.081 0 .199.172.328.172h11.375c.128 0 .246-.172.328-.172s.109-.18.109-.351v-.875c0-.18-.027-.18-.11-.352Zm0 3.5h-.329c-.082.172-.109.172-.109.352v.875c0 .171.027.351.11.351.081 0 .199.172.328.172h11.375c.128 0 .246-.172.328-.172s.109-.18.109-.351v-.875c0-.18-.027-.18-.11-.352Zm0 3.5h-.329c-.082.172-.109.172-.109.352v.875c0 .171.027.351.11.351.081 0 .199.172.328.172h11.375c.128 0 .246-.172.328-.172s.109-.18.109-.351v-.875c0-.18-.027-.18-.11-.352Zm0 0"
                        ></path>
                    </g>
                </svg>
            );

        case 'folder_without_content':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42">
                    <g id="surface1">
                        <path
                            fill="#2980B9"
                            d="M3.5 8.75a3.504 3.504 0 0 0-3.5 3.5v24.5c0 1.926 1.566 3.5 3.5 3.5h35c1.934 0 3.5-1.574 3.5-3.5v-24.5c0-1.926-1.566-3.5-3.5-3.5Zm0 0"
                        ></path>
                        <path
                            fill="#2980B9"
                            d="M5.25 1.75a3.504 3.504 0 0 0-3.5 3.5v24.5c0 1.926 1.566 3.5 3.5 3.5h31.5c1.934 0 3.5-1.574 3.5-3.5v-21c0-1.926-1.566-3.5-3.5-3.5h-14l-5.25-3.5Zm0 0"
                        ></path>
                        <path fill="#BDC3C7" d="M40.25 24.5v-14c0-1.926-1.566-3.5-3.5-3.5H5.25a3.504 3.504 0 0 0-3.5 3.5v14Zm0 0"></path>
                        <path
                            fill="#3498DB"
                            d="M3.5 8.75a3.504 3.504 0 0 0-3.5 3.5V35c0 1.926 1.566 3.5 3.5 3.5h35c1.934 0 3.5-1.574 3.5-3.5V12.25c0-1.926-1.566-3.5-3.5-3.5Zm0 0"
                        ></path>
                    </g>
                </svg>
            );

        default:
            return null;
    }
};

export default Icons;
