import React from 'react'

export default function MoneyReceiptModal() {
  return (
    <>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Money Receipt</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div classNameName="row">
                    <div classNameName='col-md my-2'>MR No</div>

                </div>
                <input type="text" classNameName="form-control" id='coDocNo' autoComplete="off"
                                    name='coDocNo' 
                                    value={input.MarineAmount}
                                    onChange={handleInput}
                                    placeholder='' />
                                
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
      
    </>
  )
}
