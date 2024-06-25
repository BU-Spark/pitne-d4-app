import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    image?: string;
  };
};

function AllDevelopments() {
  const navigate = useNavigate();
  const [developments, setDevelopments] = useState<DevelopmentData[]>([]);

  const fetchDevelopments = async () => {
    try {
      const {
        data: { data },
      } = await axios.get("http://pitne-d4-app-strapi-production.up.railway.app/api/developments?populate=*");
      const fetchedDevelopments = data.map((item: any) => ({
        id: item.id,
        attributes: {
          title: item.attributes.title,
          body: item.attributes.body,
          website: item.attributes.website,
          date: item.attributes.date,
          image: item.attributes.image?.data && item.attributes.image.data.length > 0
            ? "http://pitne-d4-app-strapi-production.up.railway.app" + item.attributes.image.data[0].attributes.url
            : '',
        },
      }));
      setDevelopments(fetchedDevelopments);
    } catch (error) {
      console.error("Failed to fetch developments:", error);
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
          <h2 className="top-heading">All Developments</h2>
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
}

export default AllDevelopments;