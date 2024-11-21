import { useEffect, useState } from 'react';
import { getitems, getitembyid, edititem, deleteitem } from '../APIs/ApiOffer';

export default function OfferListTable({ isFilter, searchfilter, selectcategory }) {

    const [offerList, setOfferList] = useState([]);

    const loadData = () => {
        getitems().then((response) => {
            const data = response.data;
            setOfferList(data);
        }).catch(console.error());
    }

    useEffect(() => {
        loadData();
    }, []);

    const toggleitems = (itemid) => {
        getitembyid(itemid).then((response) => {
            const toggle = response.data.isEnabled;
            edititem(itemid, { isEnabled: !toggle }).then(() => { loadData() });
        }).catch(console.error());
    };

    const deleteItems = (itemid) => {
        deleteitem(itemid).then(() => { loadData() });
    };

    const filtercategory = () => {
        switch (selectcategory) {
            case "true": return offerList.filter(el => el.isEnabled === true)
            case "false": return offerList.filter(el => el.isEnabled === false)
            default: return offerList
        };
    };
    const filterlist = () => {
        if (isFilter === true) {
            return filtercategory().filter(el => el.offer.toUpperCase().includes(searchfilter.toUpperCase()))
        }
        else {
            return offerList
        }
    };

    let totalImpressions = filterlist().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.impressions }, 0);
    let totalConversions = filterlist().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.conversions }, 0);
    let totalRevenue = filterlist().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.revenue }, 0).toFixed(2);
    let totalConversionRate = filterlist().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + ((cur.conversions / cur.impressions) * 100)}, 0).toFixed(2);

    return (<>
        <table className="table tbl-sty1">
            <thead>
                <tr>
                    <th></th>
                    <th className="text-start">Offer</th>
                    <th>Impressions</th>
                    <th>Conversions</th>
                    <th>Revenue</th>
                    <th>Conversion Rate</th>
                    <th className="text-end">Action</th>
                </tr>
            </thead>
            <tbody>
                {filterlist().map(items => (
                    <tr key={items.id} className={items.isEnabled ? 'align-middle' : 'align-middle disabled'}>
                        <td>
                            <div onClick={() => toggleitems(items.id)} className={items.isEnabled ? 'switch enabled' : 'switch'}><div className='switch_btn'></div></div>
                        </td>
                        <td className="text-start">{items.offer}</td>
                        <td>{items.impressions}</td>
                        <td>{items.conversions}</td>
                        <td>$ {items.revenue}</td>
                        <td>{((items.conversions / items.impressions) * 100).toFixed(2)} %</td>
                        <td>
                            <div className="d-flex col-gap-15 justify-content-end">
                                <button className='btn btn-sty2'>Edit</button>
                                <button className='btn btn-danger' onClick={() => deleteItems(items.id)}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th className="text-start">Total</th>
                    <th>{totalImpressions}</th>
                    <th>{totalConversions}</th>
                    <th>$ {totalRevenue}</th>
                    <th>{totalConversionRate} %</th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    </>);
}