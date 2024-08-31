"use state"
import React from 'react'

const DeleteBtn = ({ id }: { id: string }) => {


    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure?")


        try {
            if (confirm) {
                const resp = await fetch(`/api/posts?id=${id}`, {
                    method: 'DELETE'
                })
                if (resp.ok) {
                    console.log(resp.ok)
                    window.location.reload()
                }
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <a onClick={handleDelete} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Delete</a>
    )
}

export default DeleteBtn