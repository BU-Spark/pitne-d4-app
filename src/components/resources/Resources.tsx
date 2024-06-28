import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, Modal, Button } from '@patternfly/react-core';
import { ResourceTable } from '../../interfaces';

interface ResourcesProps {
    resource: ResourceTable;
}

const Resources: React.FC<ResourcesProps> = ({ resource }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleContinue = () => {
        window.location.href = resource.attributes.link;
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className="box-shadow-brand" onClick={handleClick} style={{ cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}>
                <Card isHoverable>
                    <CardHeader>
                        <CardTitle>
                            <div className='m-1' style={{ backgroundColor: "white", fontSize: '20px', textAlign: 'center' }}>
                                <p>{resource.attributes.title}</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <Modal
                title="Redirect Notice"
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="cancel" variant="secondary" className='p-1' onClick={handleModalToggle}>
                        Cancel
                    </Button>,
                    <Button key="continue" variant="primary" className='p-1' onClick={handleContinue}>
                        Continue
                    </Button>
                ]}
            >
                <p>You are about to be redirected to a new page. Do you want to continue?</p>
            </Modal>
        </>
    );
};

export default Resources;