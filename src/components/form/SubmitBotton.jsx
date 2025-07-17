
import { FastField } from 'formik';
import React from 'react'
import SpinnerLoad from '../SpinnerLoad';

export default function SubmitBotton({id=null}) {
  
   return (
        <FastField>
        {({ form }) => {
          return (
            <button type="submit" className="btn btn-primary btn-sm" disabled={form.isSubmitting}>
              {id ? "ویرایش": "ذخیره" }
              {form.isSubmitting ? <SpinnerLoad colorClass={"text-white"} isSmall={true} inline={true}/> : null}
            </button>
          );
        }}
      </FastField>
    );
}