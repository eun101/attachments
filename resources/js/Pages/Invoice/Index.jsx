import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/inertia-react';
import { filter, get } from 'lodash';
import { useEffect, useState } from 'react';
import Pagination from '@/Components/Pagination';


export default function Invoices(props) {

    const [filters, setFilters] = useState();

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFilters(values=>({...values, [fieldName]: fieldValue}));

    }

    const doSearchHandler = (event) =>{

        Inertia.get(route(route().current()),filters,
        {
            preserveState: true,
            replace: true,
        }); 

    }

    const onAddHandler = ()=>{
        Inertia.get(route('invoices.create'));
    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoices</h2>}
        >
            <Head title="Invoices" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-4">
                <PrimaryButton type='button' onClick={onAddHandler}>+Add</PrimaryButton>
                <div>{props.status}</div>
            </div>

            <div className="pt-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div class="grid grid-cols-5 gap-2">
                                <div className="col-sm-3">
                                    <input type="text" className="form-control" name="keyword" placeholder="Keyword" onKeyUp={handleChange}/>
                                </div>                                
                                <div className="col-sm-2">
                                    <input type="date" className="form-control" name="date_from" placeholder="Date From" onChange={handleChange}/>
                                </div>
                                <div className="col-sm-2">
                                    <input type="date" className="form-control" name="date_to" placeholder="Date To" onChange={handleChange}/>
                                </div>
                                <div className="col-sm-2">
                                    <PrimaryButton type='button' onClick={doSearchHandler}>Search</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                <tr className="text-left font-bold">
                                    <th className="pb-4 pt-6 px-6">Invoice #</th>
                                    <th className="pb-4 pt-6 px-6">Invoice To</th>
                                    <th className="pb-4 pt-6 px-6">Date</th>
                                    <th className="pb-4 pt-6 px-6">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {props.invoices.data.map((item)=>{
                                        return (

                                            <tr className="text-left font-bold">
                                                <td className="pb-4 pt-6 px-6">
                                                    <Link className="flex items-center px-6 py-4 focus:text-indigo-500" href={`/invoices/${item.inv_id}/edit`}>
                                                        {item.inv_number}
                                                    </Link>
                                                </td>
                                                <td className="pb-4 pt-6 px-6">{item.inv_to}</td>
                                                <td className="pb-4 pt-6 px-6">{item.inv_date}</td>
                                                <td className="pb-4 pt-6 px-6">{item.inv_amount}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        
                            <Pagination resultList={props.invoices}/>
                        </div>
                    </div>
                </div>
            </div>
           
           

        </AuthenticatedLayout>
    );
}