import * as React from "react";
import { Card, CardHeader, CardFooter, CardTitle, CardExpandableContent } from '@patternfly/react-core';
import './associations_card.css'
import { AssociationTable } from "interfaces";

interface AssociationCardProps {
    association: AssociationTable | undefined;
}

const AssociationCard: React.FC<AssociationCardProps> = ({ association }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="association-card" onClick={handleExpand} style={{ cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}>
            <Card isHoverable isExpanded={isExpanded}>
                <CardHeader>
                    <CardTitle>
                        <div className='m-1' style={{ backgroundColor: "white" }}>
                            <p>{association?.attributes.Name}</p>
                        </div>
                    </CardTitle>
                </CardHeader>
                {isExpanded && (
                    <CardExpandableContent>
                        <CardFooter>
                            <div style={{ backgroundColor: "white" }}>
                                <p>{association?.attributes.Description}</p>
                                <p>
                                    <b>Meeting Time: </b>
                                    {association?.attributes.MeetingTime}
                                </p>
                                <p>
                                    <b>Meeting Location: </b>
                                    {association?.attributes.MeetingLocation}
                                </p>
                                <a href={association?.attributes.Link}>Website</a>
                                <p>{association?.attributes.ContactInfo}</p>
                            </div>
                        </CardFooter>
                    </CardExpandableContent>
                )}
            </Card>
        </div>
    );
};

export default AssociationCard;