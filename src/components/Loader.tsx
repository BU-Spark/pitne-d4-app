import React from "react";
import { Triangle } from 'react-loader-spinner';
import './Loader.css'

const Loader: React.FC = () => {
    return (
        <div className="loader">
            <Triangle
                height={160}
                width={160}
                color="#000000"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="triangle-loading"
            />
        </div>
    );
};

export default Loader;
