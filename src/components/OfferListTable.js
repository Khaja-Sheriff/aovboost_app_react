import { useCallback, useEffect, useState } from 'react';
import { getItems, editItem, deleteItem } from '../APIs/ApiOffer';
import Loader from './Loader'

export default function OfferListTable({ searchFilter, selectCategory }) {

    const [isLoading, setIsLoading] = useState(true);

    const [offerList, setOfferList] = useState([]);

    const loadData = useCallback(() => {
        getItems().then((response) => {
            const data = response.data;
            setIsLoading(true);
            setOfferList(data);
        }).catch(console.error());
    },[setIsLoading,setOfferList]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const toggleItems = (item) => {
        const toggle = item.isEnabled;
        editItem(item.id, { isEnabled: !toggle }).then(() => { loadData() }).catch(console.error());
    };

    const deleteItems = (itemId) => {
        deleteItem(itemId).then(() => { loadData() }).catch(console.error());
    };

    const filterCategory = useCallback(() => {
        switch (selectCategory) {
            case "true": return offerList.filter(el => el.isEnabled === true)
            case "false": return offerList.filter(el => el.isEnabled === false)
            default: return offerList
        };
    },[offerList,selectCategory]);
    
    const filterList = useCallback(() => {
        if (selectCategory) {
            return filterCategory().filter(el => el.offer.toUpperCase().includes(searchFilter.toUpperCase()))
        }
        else {
            return offerList
        }
    },[offerList,filterCategory,searchFilter,selectCategory]);

    // useEffect(() => {
    //     console.log(filterList());
    //     filterList();
    // },[searchFilter, selectCategory]);

    useEffect(() => {
        console.log(filterList());
        filterList();
    },[filterList, searchFilter, selectCategory]);

    let totalImpressions = filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.impressions }, 0);
    let totalConversions = filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.conversions }, 0);
    let totalRevenue = filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + cur.revenue }, 0).toFixed(2);
    let totalConversionRate = filterList().filter(el => el.isEnabled === true).reduce((amt, cur) => { return amt + ((cur.conversions / cur.impressions) * 100) }, 0).toFixed(2);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [isLoading]);

    return (<>
        {isLoading && <Loader />}
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
                {filterList().map(items => (
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