import React from 'react';
import { Card, CardHeader, CardTitle } from '@patternfly/react-core';
import { ResourceTable } from '../../interfaces';

interface ResourcesProps {
    resource: ResourceTable;
}

const Resources: React.FC<ResourcesProps> = ({ resource }) => {
    const handleClick = () => {
        window.location.href = resource.attributes.link;
    };

    return (
        <div className="box-shadow-brand" onClick={handleClick} style={{ cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}>
            <Card isHoverable>
                <CardHeader>
                    <CardTitle>
                        <div className='m-1' style={{ backgroundColor: "white" }}>
                            <p>{resource.attributes.title}</p>
                        </div>
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    );
};

export default Resources;
