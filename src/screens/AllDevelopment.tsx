import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/Footer";
import DetailedDevelopmentCard from "../components/developments/DetailedDevs";

type DevelopmentData = {
  id: string;
  attributes: {
    title: string;
    body: string;
    website?: string;
    date?: string;
  };
};

const AllDevelopments: React.FC = () => {
  const [developments, setDevelopments] = useState<DevelopmentData[]>([]);

  const fetchDevelopments = async () => {
    try {
      const response = await fetch("https://pitne-d4-app-strapi-production.up.railway.app/api/developments?populate=*");

      console.log("Response:", response);

      if (response.ok) {
        const json = await response.json();

        console.log("JSON Data:", json);

        const fetchedDevelopments = json.data.map((item: any) => {
          let formattedDate = "";
          if (item.attributes.date) {
            const dateObj = new Date(item.attributes.date);
            formattedDate = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          }

          return {
            id: item.id,
            attributes: {
              title: item.attributes.title,
              body: item.attributes.description,
              website: item.attributes.link,
              date: formattedDate,
            },
          };
        });

        console.log("Fetched Developments:", fetchedDevelopments);

        setDevelopments(fetchedDevelopments);
      }
      else {
        console.log(`Status code: ${response.status}`);

        setDevelopments([{
          id: '-1',
          attributes: {
            title: "Uh Oh!",
            body: "Looks like there was an issue!",
            website: "#",
            date: ""
          }
        }]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);

      setDevelopments([{
        id: '-1',
        attributes: {
          title: "Uh Oh!",
          body: "Looks like there was an issue!",
          website: "#",
          date: ""
        }
      }]);
    }
  };

  useEffect(() => {
    fetchDevelopments();
  }, []);

  return (
    <div>
      <div className="page-container">
        <div className="content-wrap">
          <div className="mb-5">
            <NavBar />
          </div>
          <h2 className="top-heading">ALL DEVELOPMENTS</h2>
          <div className="detailed-developments-container">
            {developments.map(development => (
              <DetailedDevelopmentCard
                key={development.id}
                title={development.attributes.title}
                body={development.attributes.body}
                website={development.attributes.website}
                date={development.attributes.date}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllDevelopments;
