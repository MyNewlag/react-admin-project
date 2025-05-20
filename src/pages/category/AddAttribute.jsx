
import React from 'react'

export default function AddAttribute() {
  return (
 <div className="modal fade" id="add_product_category_attr_modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title flex-fill" id="exampleModalLabel">افزودن ویژگی به دسته بندی</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="row my-3">
                            <div className="col-12 col-md-6 col-lg-4 my-1">
                                <input type="text" className="form-control" placeholder="عنوان ویژگی جدید"/>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 my-1">
                                <input type="text" className="form-control" placeholder="واحد ویژگی جدید"/>
                            </div>
                            <div className="col-8 col-lg-2 my-1">
                                <div className="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
                                    <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">نمایش در فیلتر</label>
                                    <input className="form-check-input pointer mx-3" type="checkbox" id="flexSwitchCheckDefault" checked onChange={()=>{}}/>
                                </div>                            
                            </div>
                            <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
                                <i className="fas fa-check text-light bg-success rounded-circle p-2 mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text" title="ثبت ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                            </div>
                        </div>
                        <hr/>
                        <div className="row justify-content-between">
                            <div className="col-10 col-md-6 col-lg-4">
                                <div className="input-group mb-3 dir_ltr">
                                    <input type="text" className="form-control" placeholder="قسمتی از عنوان را وارد کنید"/>
                                    <span className="input-group-text" >جستجو</span>
                                </div>
                            </div>
                        </div>
                        <table className="table table-responsive text-center table-hover table-bordered">
                            <thead className="table-secondary">
                                <tr>
                                    <th>#</th>
                                    <th>عنوان</th>
                                    <th>واحد</th>
                                    <th>نمایش در فیلتر</th>
                                    <th>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>ویژگی شماره 1</td>
                                    <td>عدد</td>
                                    <td>
                                        <div className="form-check form-switch d-flex justify-content-center">
                                            <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault" checked onChange={()=>{}}/>
                                        </div>
                                    </td>
                                    <td>
                                        <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" title="ویرایش دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                        <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">انصراف</button>
            </div>
          </div>
        </div>
    </div>
  )
}
