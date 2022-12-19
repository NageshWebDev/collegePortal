import React from "react";
import { useLoaderData } from "react-router-dom";
import style from './StudentRecord.module.css'

export default function StudentRecord() {

  const loaderData = useLoaderData()
  console.log(loaderData)

  return (
    <React.Fragment>
      {
        loaderData.payload.legth &&
        <section id="section" className={style.portal_outlet} >
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"><p className="display-6 p-0 m-0">#</p></th>
                <th scope="col"><p className="display-6 p-0 m-0">Roll No.</p></th>
                <th scope="col"><p className="display-6 p-0 m-0">Name</p></th>
                <th scope="col"><p className="display-6 p-0 m-0">Email</p></th>
                <th scope="col"><p className="display-6 p-0 m-0">Resume</p></th>
              </tr>
            </thead>
            <tbody>

              {
                loaderData.payload.map((data, index) => {
                  const filePath = data.filePath;
                  const fileName = data.fileName;
                  const folderPath = require(`../../src/${filePath}`)

                  return (
                    <tr key={Date.now() + Math.random()}>
                      <th scope="row">{index}</th>
                      <td>{data.stuRoll}</td>
                      <td>{data.stuName}</td>
                      <td>{data.stuEmail}</td>
                      <td><a href={folderPath} target="_blank" rel="noreferrer">{fileName}</a></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </section>
      }
      {
        !loaderData.payload.length &&
        <div className="alert alert-danger text-center" role="alert">
          <p className="display-6 p-0 m-0"><i className="fa-solid fa-file-excel"></i> No Record Found</p>
        </div>
      }
    </React.Fragment>
  )
}

export async function loader() {
  console.log()
  const response = await fetch('/getMeStudentRecord')
  if (!response.ok) {
    throw new Error('Student Record NOT Fetched')
  }
  const responseJSON = await response.json()
  const payload = responseJSON.payload;
  return ({ payload })
}