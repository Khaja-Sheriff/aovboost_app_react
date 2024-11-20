import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function Offers() {

    const navigate = useNavigate();
    const [offerName, setOfferName] = useState("");
    const [filteredItems, setfilteredItems] = useState("");

    const handleChange = (e) => {
        setfilteredItems(e.target.value);
    };

    return (<>
        <Header />
        <div className="box_sty1">
            <div className="d-flex justify-content-between mb-3 col-gap-15">
                <div><input type="text" placeholder="Search" className="form-control" onChange={e => setOfferName(e.target.value)} /></div>
                <div>
                    <select className="form-control" onChange={handleChange}>
                        <option value={"all"}>All</option>
                        <option value={true}>Enabled</option>
                        <option value={false}>Disabled</option>
                    </select>
                </div>
                <div className="flex-grow-1"></div>
                <button className="btn btn-sty1" onClick={() => { navigate("/Offers/AddOffer") }}>Create New Offer</button>
            </div>
        </div>
    </>);
}