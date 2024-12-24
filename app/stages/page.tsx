"use client"
import React, { useEffect, useState } from 'react'
import Table from '../Components/Table/Table'
import Button from '../Components/Button/Button';
import Modal from '../Components/Modals/Modal';
import { useGlobalState } from '../context/globalProvider';
import CreateContent from '../Components/Modals/CreateContent';
import CreateStage from '../Components/Modals/CreateStage';
import axios from '../utils/axios';
import { formatDateTime } from '../utils/helpers';
import toast from 'react-hot-toast';
import Search from '../Components/Search/Search';

function page() {
  const [page, setPage] = useState(1);
  const [stageData, setStageData] = useState({
    data: [],
    pagination: {
      per_page: 10,
      current_page: 1,
      next_page: 2,
      previous_page: 0,
      total_pages: 1,
      total_count: 10,
    },
    message: ""
  });

  const handleStatusChange = (id: number, status: boolean) => {
    axios.put('/stage', { id, status })
      .then((res) => {
        console.log("handleStatusChange ====>", res?.data)
        toast.success("Stage updated successfully.");
        getAllStagesData();
      }).catch((err) => {
        toast.error("Something went wrong.");
        console.log(err);
      })  
  }   

  const handleDelete = (id: number) => {
    axios.delete('/stage', { 
      data: { id }
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Stage deleted successfully.");
          getAllStagesData();
        }
      })
      .catch((err) => {
        toast.error("Something went wrong.");
        console.log(err);
      })
  }

      

  const { theme, isLoading, openModal, modal } = useGlobalState();
  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Created At', accessor: 'createdAt' , 
      cell: (value: Date) => formatDateTime(value)
    },
    { header: 'Updated At', accessor: 'updatedAt',
      cell: (value: Date) => formatDateTime(value)
    },
    {
      header: 'Status',
      accessor: 'isActive',
      cell: (value: boolean) => (
        console.log("value ====>", value),
        <span className={`px-2 py-1 rounded-full text-sm ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (value: any, row: any) => (
        <div className="relative group">
          <button type="button" className="px-2 py-1 text-gray-400 hover:text-white">
            ⋮
          </button>
          <div className="hidden group-hover:block absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg z-10 border border-red-600">
            <div className="py-1">
              <button 
                type="button"
                onClick={() => handleStatusChange(row.id, !row.isActive)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {row.isActive ? 'Inactive' : 'Enable'}
              </button>
              <button 
                type="button"
                onClick={() => handleDelete(row.id)}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const getAllStagesData = (page: number = 1, search?: string) => {
    axios.get('/stage', {
      params: {
        page,
        search
      }
    })
      .then((res) => {
        
        if (res?.status == 200) {
          setStageData({
            data: res?.data?.stages,
            pagination: res?.data?.pagination,
            message: res?.data?.message
          });


        }
      })
      .catch((err) => {
        console.log("err ====>", err)
      })
  }


  useEffect(() => {
    getAllStagesData();
  }, [])
  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
      {modal && <Modal content={<CreateStage />} />}
      <h1 className='text-2xl font-bold'>Stages</h1>
      <div className='flex justify-end gap-2  '>
        <Search onSearch={(value) => getAllStagesData(1, value)} />
        <Button
          name="Add Stages"
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          onClick={openModal}
          className=" w-fit shadow hover:shadow-lg "
        />
      </div>

      
      
      {stageData?.pagination && (
        <Table
          data={stageData.data}
          columns={columns}
          handlePageChange = {getAllStagesData}

          pagination={stageData.pagination}
        />
      )}
    </div>
  )
}

export default page


