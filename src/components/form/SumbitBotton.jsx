
import { FastField } from 'formik';
import React from 'react'
import SpinnerLoad from '../SpinnerLoad';

export default function SumbitBotton() {
   return (
        <FastField>
        {({ form }) => {
          return (
            <button type="submit" className="btn btn-primary btn-sm" disabled={form.isSubmitting}>
              ذخیره
              {form.isSubmitting ? <SpinnerLoad colorClass={"text-white"} isSmall={true} inline={true}/> : null}
            </button>
          );
        }}
      </FastField>
    );
}
