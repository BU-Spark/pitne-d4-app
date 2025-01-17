import * as React from 'react';
import { Button, Card, CardHeader, CardFooter, CardTitle, CardExpandableContent } from '@patternfly/react-core';
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Footer from '../components/Footer';

function CivicAssociationsInfo() {
    const navigate = useNavigate();

    const navigateToNext = () => {
        // Handle navigation to the next page
        navigate("/address-info");
    };

    const [expandedCardId, setExpandedCardId] = React.useState(null);

    const handleExpand = (cardId) => {
        setExpandedCardId(expandedCardId === cardId ? null : cardId);
    };

    const cards = [
        {
            id: 1,
            question: "What is a Civic Association?",
            answer: "Civic associations serve as vital hubs for local engagement and collective action. These grassroots organizations are driven by residents who come together to address shared concerns and improve the quality of life in their neighborhoods."
        },
        {
            id: 2,
            question: "What do they do?",
            answer: "Through their advocacy efforts and community-building initiatives, civic associations play a crucial role in enhancing neighborhood cohesion and resilience. By organizing events, facilitating communication channels, and advocating for equitable policies, these organizations create spaces where residents can connect, collaborate, and collectively address challenges."
        },
        {
            id: 3,
            question: "How can I join one?",
            answer: "Civic associations are organized by specific geographic areas, ensuring each neighborhood has a dedicated group working to improve local quality of life. By attending meetings and participating in discussions, you can directly influence your community."
        }
    ];

    return (
        <div>
            <div className="container">
            <div className="mb-5">
            <NavBar />
            </div>
        <NavBar />

        <div className="top-heading">Civic Associations</div>
            <div className='m-4' style={{ height: 'max-content', minHeight: '63vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <div>
                    <NavBar />
                </div>
                <div>
                    {cards.map((card) => (
                        <div key={card.id} className='mt-3 box-shadow-brand' onClick={() => handleExpand(card.id)}>
                            <Card isHoverable isExpanded={expandedCardId === card.id}>
                                <CardHeader>
                                    <CardTitle>
                                        <div style={{ backgroundColor: "white", display: 'flex', alignItems: 'center', textAlign: 'left', color: '#152d5c'}}>
                                            <p><b>Q. </b>{card.question}</p>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                {expandedCardId === card.id && (
                                    <CardExpandableContent>
                                        <CardFooter>
                                            <div style={{ backgroundColor: "white" }}>
                                                <div style={{ textAlign: 'left' }}>
                                                    <b>A. </b> {card.answer}
                                                </div>
                                            </div>
                                        </CardFooter>
                                    </CardExpandableContent>
                                )}
                            </Card>
                        </div>
                    ))}
                </div>
                {/* Find your Civic Association Button */}
                <div className='p-2 mb-5 bottom-0' style={{ marginTop: '2vh'}}>
                    <Button
                        onClick={navigateToNext}
                        className="px-5 py-1 brand-blue"
                        variant="primary"
                    >
                        Find your Civic Association
                    </Button>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default CivicAssociationsInfo;
