import React, { useEffect, useState } from 'react';
import JsonData from "../../data/data.json";
import "./teamPage.css"

import PageHeader from '../../components/pageHeader/page-header';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

const TeamPage = () => {
    const [teamPageData, setTeamPageData] = useState([]);
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);

    useEffect(() => {
        setTeamPageData(JsonData.Team);
    }, []);

    return (
        <>
            <PageHeader title="LAWYER WEB TEAM" />
            <div id="team" className="text-center">
                <div className="container">
                    <div className="col-md-8 col-md-offset-2 section-title">
                        <h2>EKİBİMİZLE TANIŞIN</h2>
                        <p>
                            Firmamız, hukuki ihtilaflar ve bunların çözümleri konusunda ileri düzeyde bilgi ve beceriye sahip deneyimli avukatlardan oluşmaktadır.
                        </p>
                    </div>
                    <div id="row" className="team-row col-xs-12">
                        {teamPageData.length > 0
                            ? teamPageData.map((d, i) => (
                                <div key={`${d.name}-${i}`} className={`team ${i < 2 ? 'col-xs-6 large-team' : 'col-md-3 col-sm-4 col-xs-4 small-team'}`}>
                                    <div className="thumbnail">
                                        <div className='team-card'>
                                            <img src={d.img} alt="..." className="team-img" />
                                            <div className="caption">
                                                <h4>{d.name}</h4>
                                                <p>{d.job}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <LoadingSpinner />}
                    </div>
                </div>
            </div>
        </>

    );
};

export default TeamPage;