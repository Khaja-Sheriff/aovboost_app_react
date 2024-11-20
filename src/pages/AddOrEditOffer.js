import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function AddOrEditOffer() {

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

    return (<>
        <Header />
        <div className="p-4">
            <div className="row">
                <div className="col-md-8">
                    <div className="box_sty1">
                        <label className="form-label">Offer Name (Internal Use Only)</label>
                        <input type="text" placeholder="e.g New Offer" className="form-control" />
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Offer Discount Code (Must Be Unique)</label>
                        <input type="text" placeholder="e.g OFFER2020" className="form-control" />
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Minimum Cart Value (to Trigger Offer)</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Set Offer Discount</label>
                        <div className="input-group">
                            <input type="text" className="form-control" />
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                    <div className="box_sty1 mt-4">
                        <label className="form-label">Choose Your Offer Product</label>
                        <select className="form-control">
                            <option>Select a product</option>
                        </select>
                        <label className="form-label mt-4">Choose Your Offer Product Variant (Ensure variant is in stock to show up)</label>
                        <select className="form-control">
                            <option>Select a variant</option>
                        </select>
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
                        <button className="btn btn-sty2">Back</button>
                        <button className="btn btn-sty1">Create offer</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="box_sty1 offerpreview" style={{ width: offerPreviewWidth }}>offer preview</div>
                </div>
            </div>
        </div>
    </>);
}