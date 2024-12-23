"use client"
import React, { useState } from 'react'
import Table from '../Components/Table/Table'
import Button from '../Components/Button/Button';
import Modal from '../Components/Modals/Modal';
import { useGlobalState } from '../context/globalProvider';
import CreateContent from '../Components/Modals/CreateContent';
import CreateStage from '../Components/Modals/CreateStage';

function page() {
  const [page, setPage] = useState(1);
  const { theme, isLoading, openModal, modal } = useGlobalState();
  const columns = [
    { header: 'S No', accessor: 'sNo' },
    { header: 'Order Id', accessor: 'orderId' },
    { header: 'Title', accessor: 'title' },
    { header: 'Price', accessor: 'price' },
    { header: 'Status', accessor: 'status' },
    { header: 'Date', accessor: 'date' },
  ];
  const data = [
    { sNo: '1', orderId: '123456', title: 'Product 1', price: '100', status: 'Pending', date: '2024-01-01' },
    { sNo: '2', orderId: '123457', title: 'Product 2', price: '200', status: 'Pending', date: '2024-01-02' },
    { sNo: '3', orderId: '123458', title: 'Product 3', price: '300', status: 'Pending', date: '2024-01-03' },
    { sNo: '4', orderId: '123459', title: 'Product 4', price: '400', status: 'Pending', date: '2024-01-04' },
    { sNo: '5', orderId: '123460', title: 'Product 5', price: '500', status: 'Pending', date: '2024-01-05' },
    { sNo: '6', orderId: '123461', title: 'Product 6', price: '600', status: 'Pending', date: '2024-01-06' },
    { sNo: '7', orderId: '123462', title: 'Product 7', price: '700', status: 'Pending', date: '2024-01-07' },
    { sNo: '8', orderId: '123463', title: 'Product 8', price: '800', status: 'Pending', date: '2024-01-08' },
    { sNo: '9', orderId: '123464', title: 'Product 9', price: '900', status: 'Pending', date: '2024-01-09' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },
    { sNo: '10', orderId: '123465', title: 'Product 10', price: '1000', status: 'Pending', date: '2024-01-10' },

  ];

  const pagination = {
    pageSize: 10,
    currentPage: page,
    totalPages: 10, // Adjust based on your data
    onPageChange: setPage,
  };
  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
      {modal && <Modal content={<CreateStage />} />}

      <h1 className='text-2xl font-bold'>Orders</h1>

      {/* <div className='flex justify-end cursor-pointer border p-2 rounded-md'>Add Order</div> */}
      <Button name="Create Task"
        padding={"0.8rem 2rem"}
        borderRad={"0.8rem"}
        fw={"500"}
        fs={"1.2rem"}
        // background={"rgb(0, 163, 255)"} 
        onClick={openModal}> Add Order</Button>
      <Table data={data} columns={columns} pagination={pagination} />
    </div>
  )
}

export default page


