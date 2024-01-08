import React, {useState} from "react";
import {useForm} from "react-hook-form";
import { createLogEntry } from "./Api";

const LogEntryForm = ({location, onClose}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {register, handleSubmit} = useForm();

  const onSubmit = async (data) => {
    try{
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      onClose();
    } catch(error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
    
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)} >
      {error ? <h3 className="error">{error}</h3> : null}
      
      <label htmlFor="username">Username</label>
      <input {...register('username')} required placeholder="username"/>
     
      <label htmlFor="title">Title</label>
      <input {...register('title')} required placeholder="title" />

      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} {...register('comments')} required></textarea>

      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} {...register("description")}></textarea>

      <label htmlFor="image">Image</label>
      <input name="image" {...register("image")}  placeholder="image url"/>

      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required {...register("visitDate")} />

      <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Create Log Entry' }</button>
    </form>
  );
};

export default LogEntryForm;
