import React from "react";
import { useForm } from "react-hook-form";

const LogEntryForm = ( ) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='title'>Title</label>
            <input name="title" required ref={register}/>
            <label htmlFor='comments'>comments</label>
            <textarea name="comments" rows={3} ref={register}></textarea>
            <label htmlFor='description'>Description</label>
            <textarea name="description" rows={3} ref={register}></textarea>
            <label htmlFor='image'>Image</label>
            <input name="image" ref={register}/>
            <label htmlFor='VisitDate'>Visit Date</label>
            <input name="VisitDate" type="date" required ref={register}/>
            <button>Create Log Entry</button>
        </form>
    )
};

export default LogEntryForm;

// import React from "react";
// import { useForm } from "react-hook-form";

// const LogEntryForm = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
//       <label htmlFor="title">Title</label>
//       <input name="title" required ref={register({ required: true })} />

//       <label htmlFor="comments">Comments</label>
//       <textarea name="comments" rows={3} ref={register} />

//       <label htmlFor="description">Description</label>
//       <textarea name="description" rows={3} ref={register} />

//       <label htmlFor="image">Image</label>
//       <input name="image" ref={register} />

//       <label htmlFor="visitDate">Visit Date</label>
//       <input name="visitDate" type="date" required ref={register({ required: true })} />

//       <button type="submit">Create Log Entry</button>
//     </form>
//   );
// };

// export default LogEntryForm;

