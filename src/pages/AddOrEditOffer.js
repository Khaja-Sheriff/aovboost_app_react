import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function AddOrEditOffer() {

    const navigate = useNavigate();

    const [offerPreviewWidth, setofferPreviewWidth] = useState();
    const [offerPreviewWidthSitcky, setofferPreviewWidthSitcky] = useState();

    useEffect(() => {
        const offerpreview = document.querySelector('.offerpreview').getBoundingClientRect();
        setofferPreviewWidth(offerpreview.width);
        setofferPreviewWidthSitcky(offerpreview.top);
    }, []);

    const isSticky = (e) => {
        const offerpreview = document.querySelector('.offerpreview')
        const scrollTop = window.scrollY;
        scrollTop >= 90 ? offerpreview.classList.add('is_sticky') : offerpreview.classList.remove('is_sticky');
    };

    useEffect(() => {
        if (!offerPreviewWidthSitcky) return;
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, [offerPreviewWidthSitcky]);

    const [createdOffer, setcreatedOffer] = useState(
        {
            offer:"",
            offerDiscountCode:"",
            minCartValue:0,
            offerDiscount:0,
            impressions:0,
            conversions:0
        }
    );

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    const handleChange = (e) => {
        const {name,value} = e.target;
        let numCheck;
        if (isNumeric(value)) {
            numCheck = +value
        } else {
            numCheck = value
        }
        setcreatedOffer((prevState) => ({
            ...prevState,
            [name]:numCheck
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(createdOffer);
    };

    return (<>
        <Header />
        <div className="p-4">
            <div className="row">
                <div className="col-md-8">
                    <div className="box_sty1">
                        <label className="form-label">Offer Name (Internal Use Only)</label>
                        <input type="text" placeholder="e.g New Offer" className="form-control" value={createdOffer.offer} name="offer" onChange={handleChange} />
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Offer Discount Code (Must Be Unique)</label>
                        <input type="text" placeholder="e.g OFFER2020" className="form-control" value={createdOffer.offerDiscountCode} name="offerDiscountCode" onChange={handleChange} />
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Minimum Cart Value (to Trigger Offer)</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" value={createdOffer.minCartValue} name="minCartValue" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Set Offer Discount</label>
                        <div className="input-group">
                            <input type="text" className="form-control" value={createdOffer.offerDiscount} name="offerDiscount" onChange={handleChange} />
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                    <div className="box_sty1 mt-4">
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Impressions</label>
                                <input type="text" className="form-control" value={createdOffer.impressions} name="impressions" onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label className="form-label">Conversions</label>
                                <input type="text" className="form-control" value={createdOffer.conversions} name="conversions" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Choose Your Offer Product</label>
                        <div className="select">
                            <select className="form-control">
                                <option>Select a product</option>
                            </select>
                        </div>
                        <label className="form-label mt-4">Choose Your Offer Product Variant (Ensure variant is in stock to show up)</label>
                        <div className="select">
                            <select className="form-control">
                                <option>Select a variant</option>
                            </select>
                        </div>
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Background Color</label>
                        <input type="text" placeholder="e.g FFFFFF" className="form-control" />
                        <label className="form-label mt-4">Font Color</label>
                        <input type="text" placeholder="e.g 000000" className="form-control" />
                        <label className="form-label mt-4">Button Color</label>
                        <input type="text" placeholder="e.g 4997E0" className="form-control" />
                        <label className="form-label mt-4">Button Font Color</label>
                        <input type="text" placeholder="e.g FFFFFF" className="form-control" />
                        <label className="form-label mt-4">Button Hover Color</label>
                        <input type="text" placeholder="e.g FFFFFF" className="form-control" />
                        <label className="form-label mt-4">Button Hover Font Color</label>
                        <input type="text" placeholder="e.g 000000" className="form-control" />
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Choose Expiration Date</label>
                        <div className="input-group mb-3">
                            <input type="text" placeholder="06/08/2020" className="form-control" disabled />
                            <span className="input-group-text"><i className="bi bi-calendar-fill"></i></span>
                        </div>
                        Or <label><input type="checkbox" /> Run Until Paused</label>
                    </div>
                    <div className="mt-4 mb-4 d-flex justify-content-between">
                        <button className="btn btn-sty2" onClick={() => {navigate("/offers")}}>Back</button>
                        <button className="btn btn-sty1" onClick={handleSubmit}>Create offer</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="box_sty1 offerpreview" style={{ width: offerPreviewWidth }}>
                        <h2>offer preview</h2>
                        <div className="offerpreviewsec">
                            <div className="img"><img src="/no-image-icon-23494.png" alt="" /></div>
                            <div className="txt">
                                <span className="offername">{createdOffer.offer}</span>
                                {createdOffer.offerDiscountCode &&  <span className="offercode">Offer Code: {createdOffer.offerDiscountCode}</span>}
                                {createdOffer.offerDiscount > 0 &&  <span className="offerdiscount">{createdOffer.offerDiscount}% Discount</span>}
                                {createdOffer.minCartValue > 0 &&  <span className="mt-1">
                                    <span className={createdOffer.offerDiscount > 0 ? "price lt":"price"}>${createdOffer.minCartValue}/-</span>
                                    {createdOffer.offerDiscount > 0 &&  <span className="dprice">${createdOffer.minCartValue - (createdOffer.minCartValue * createdOffer.offerDiscount / 100)}/-</span>}
                                </span>}
                            </div>
                            {createdOffer.offer && createdOffer.offerDiscount > 0 && <button className="btn btn-info">Add</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}