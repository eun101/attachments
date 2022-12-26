import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Select from '@/Components/Select';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm } from '@inertiajs/inertia-react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';

export default function Invoices(props) {

    const { data, setData, post, processing, errors, transform } = useForm(props.invoice);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        if(fieldName == 'attachment'){
            setData(data=>({...data, [fieldName]: event.target.files[0]}));
        }else{
            setData(data=>({...data, [fieldName]: fieldValue}));
        }
    }

    const onSaveHandler = (event) =>{
        event.preventDefault();

        if(props.invoice.inv_id > 0){
            Inertia.put('/invoices/'+ props.invoice.inv_id, data, {forceFormData: true}); 
        }else{
            Inertia.post(route('invoices.store'), data, {forceFormData: true}); 
        }        
    }

    const onCancelHandler = ()=>{
        Inertia.get(route('invoices.index')); 
    }

    const doConfirmDelete = () =>{
        setConfirmDelete(true);
    }

    const doDeleteHandler =() =>{
        Inertia.delete('/invoices/'+ props.invoice.inv_id); 
    }

    const closeModal = () => {
        setConfirmDelete(false);
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoices</h2>}
        >
            <Head title="Invoices" />

            <div className="pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <form className="mt-6 space-y-6" onSubmit={onSaveHandler}>   

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel for="invoice_number" value="Invoice #"/>

                                        <TextInput id="invoice_number" className="mt-1 block w-full"
                                            name="inv_number"
                                            value={data.inv_number}
                                            handleChange={handleChange}
                                            required
                                            autofocus 
                                        />
                                        <div className="text-red-500">{props.errors.inv_number}</div>
                                    </div>
                                    <div>
                                        <InputLabel for="invoice_to" value="Invoice To"/>

                                        <TextInput id="invoice_to" className="mt-1 block w-full"
                                            name="inv_to"
                                            value={data.inv_to}
                                            handleChange={handleChange}
                                            required
                                        />
                                        <div className="text-red-500">{props.errors.invoice_to}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel for="contact_number" value="Contact #"/>

                                        <TextInput id="contact_number" className="mt-1 block w-full"
                                            name="inv_contact_number"
                                            value={data.inv_contact_number}
                                            handleChange={handleChange}
                                            required
                                        />
                                        <div className="text-red-500">{props.errors.inv_contact_number}</div>
                                    </div>

                                    <div>
                                        <InputLabel for="invoice_date" value="Invoice Date"/>

                                        <TextInput id="invoice_date" className="mt-1 block w-full"
                                            type="date"
                                            name="inv_date"
                                            value={data.invoiceDate}
                                            handleChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <InputLabel for="currency" value="Currency"/>

                                        <Select id="currency" className="mt-1 block w-full"
                                            name="inv_currency"                                            
                                            value={data.inv_currency}
                                            handleChange={handleChange} 
                                            options={props.currencyList}
                                            placeholder="-- Select Currency --"
                                            optionLabel="cur_code"
                                            optionValue="cur_id"
                                            required/>
                                        
                                    </div>

                                    <div>
                                        <InputLabel for="status" value="Status"/>

                                        <Select id="status" className="mt-1 block w-full"
                                            name="inv_status"                                            
                                            value={data.inv_status}
                                            handleChange={handleChange} 
                                            options={props.statusList}
                                            placeholder="-- Select Status --"
                                            required/>

                                    </div>
                                    <div>
                                        <InputLabel for="payment_mehtod" value="Payment Method"/>

                                        <Select id="payment_mehtod" className="mt-1 block w-full"
                                            name="inv_payment_method"                                            
                                            value={data.inv_payment_method}
                                            handleChange={handleChange} 
                                            options={props.paymentMethodList}
                                            placeholder="-- Select Payment Method --"
                                            required/>
                                        
                                    </div>
                                </div>
                                <div className="grid">
                                    <InputLabel for="delivery_address" value="Delivery Address"/>

                                    <textarea id="delivery_address" name="inv_delivery_address" className="mt-1 block w-full" onChange={handleChange}>
                                        {data.inv_delivery_address}
                                    </textarea>
                                    
                                </div>
                                <div className="grid">
                                    <InputLabel for="delivery_address" value="Attachment"/>

                                    <TextInput id="invoice_date" className="mt-1 block w-full"
                                            type="file"
                                            name="attachment"
                                            handleChange={handleChange}
                                        />
                                    
                                    <div>{data.attachmentFile}</div>


                                </div>

                                <div className="flex items-center gap-4 py-4">
                                    <DangerButton type='button' onClick={doConfirmDelete}>Delete</DangerButton>
                                    <SecondaryButton type='button' onClick={onCancelHandler}>Cancel</SecondaryButton>
                                    <PrimaryButton type='submit' disabled={processing}>Save</PrimaryButton>
                            </div>
                            </form>

                            <Modal show={confirmDelete} onClose={closeModal}>
                                <div className="p-6 text-gray-900">
                                    <h2 className="text-lg font-medium text-gray-900 text-center">
                                        Are you sure you want to delete this record?
                                    </h2>
                                    <div className="mt-6 flex justify-center">
                                        <SecondaryButton onClick={closeModal}>No</SecondaryButton>
                                        <DangerButton className="ml-3" processing={processing} onClick={doDeleteHandler}>
                                            Yes
                                        </DangerButton>
                                    </div>
                                </div>
                            </Modal>

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}