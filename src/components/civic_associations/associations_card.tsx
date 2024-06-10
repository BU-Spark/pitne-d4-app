import * as React from "react";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Button, CardExpandableContent } from '@patternfly/react-core';
import './associations_card.css'

interface AssociationCardProps {
    association: string | undefined;
}

const AssociationCard: React.FC<AssociationCardProps> = ({ association }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="association-card">
            <Card isHoverable isExpanded={isExpanded}>
                <CardHeader onExpand={handleExpand}>
                    <CardTitle>
                        <div className='m-1' style={{ backgroundColor: "white" }}>
                            <p>{association}</p>
                        </div>
                    </CardTitle>
                </CardHeader>
                {isExpanded && (
                    <CardExpandableContent>
                        <CardFooter>
                            <div style={{ backgroundColor: "white" }}>
                                <p> Description </p>
                            </div>
                        </CardFooter>
                    </CardExpandableContent>
                )}
            </Card>
        </div>
    );
};

export default AssociationCard;