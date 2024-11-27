import { useEffect, useState } from 'react';
import { getItems, editItem, deleteItem, totalAmount } from '../APIs/ApiOffer';
import Loader from './Loader'

export default function OfferListTable({ searchFilter, selectCategory }) {

    const [isLoading, setIsLoading] = useState(true);
    const [offerList, setOfferList] = useState([]);
    const [filteredList, setfilteredList] = useState([]);

    const [total, setTotal] = useState({
        impressions:0,
        conversions:0,
        revenue:0,
        conversionRate:0
    });

    const loadData = () => {
        setIsLoading(true);
        getItems().then((response) => {
            const data = response.data;
            setOfferList(data);
            setfilteredList(data);
            setIsLoading(false);
        }).catch(console.error());
    };

    useEffect(() => {
        loadData();
    }, []);

    const toggleItems = (item) => {
        const toggle = item.isEnabled;
        editItem(item.id, { isEnabled: !toggle }).then(() => {
            loadData();
        }).catch(console.error());
    };

    const deleteItems = (itemId) => {
        deleteItem(itemId).then(() => {
            loadData()
        }).catch(console.error());
    };

    // const filterCategory = () => {
    //     switch (selectCategory) {
    //         case "true": return offerList.filter(el => el.isEnabled === true)
    //         case "false": return offerList.filter(el => el.isEnabled === false)
    //         default: return offerList
    //     };
    // };
    // const filterList = () => {
    //     if(selectCategory){
    //         return filterCategory().filter(el => el.offer.toUpperCase().includes(searchFilter.toUpperCase()))
    //     }
    //     else{
    //         return offerList
    //     }

    // };

    useEffect(() => {

        const filterCategory = () => {
            switch (selectCategory) {
                case "true": return offerList.filter(el => el.isEnabled === true)
                case "false": return offerList.filter(el => el.isEnabled === false)
                default: return offerList
            };
        };
        const filterList = () => {
            if (selectCategory) {
                return filterCategory().filter(el => el.offer.toUpperCase().includes(searchFilter.toUpperCase()))
            }
            else {
                return offerList
            }
        };

        setfilteredList(filterList());

        setTotal({
            impressions:filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.impressions }, 0),
            conversions:filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.conversions }, 0),
            revenue:filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.revenue }, 0).toFixed(2),
            conversionRate:filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + ((cur.conversions / cur.impressions) * 100) }, 0).toFixed(2)
        });


        console.log(filterList());

    }, [offerList, searchFilter, selectCategory]);


    // let totalImpressions = filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.impressions }, 0);
    // let totalConversions = filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.conversions }, 0);
    // let totalRevenue = filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.revenue }, 0).toFixed(2);
    // let totalConversionRate = filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + ((cur.conversions / cur.impressions) * 100) }, 0).toFixed(2);

    return (<>
        {isLoading && <Loader size="50" strokeColor="skyblue" strokeWidth="4" />}
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
                {filteredList.map(items => (
                    <tr key={items.id} className={items.isEnabled ? 'align-middle' : 'align-middle disabled'}>
                        <td>
                            <div onClick={() => toggleItems(items)} className={items.isEnabled ? 'switch enabled' : 'switch'}><div className='switch_btn'></div></div>
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
                    <th>{total.impressions}</th>
                    <th>{total.conversions}</th>
                    <th>$ {total.revenue}</th>
                    <th>{total.conversionRate} %</th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    </>);
}