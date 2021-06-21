import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Button, Modal } from 'reactstrap';
import WritePostForm from './WritePostForm';
import { addPostRequest } from '../data/event/postEvent';

const WritePostModal = () => {
  const initialInputs = {
    title: '',
    content: '',
    maxNum: '',
    needNum: '',
    category: 'contest',
    year: '',
    month: '',
    date: '',
    ampm: '',
    hours: '',
    minutes: '',
    contestCategory: 'REPORT',
    subject: 'ENGLISH',
    fare: '',
    hostOrganization: '',
    qualification: 'HIGHSCHOOL',
    homepage: '',
    region: '',
    duration: '',
    topic: '',
    projectDuration: '',
    departure: '',
    destination: '',
    gender: 'MALE',
    departHours: '',
    departMinutes: '',
  };
  const { isPosted } = useSelector((state) => state.post);
  const { username } = useSelector((state) => state.user.me);
  // const { username } = 1;
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const dispatch = useDispatch();
  const current = new Date();

  useEffect(() => {
    if (modal === false) {
      onReset();
    }
  }, [modal]);

  useEffect(() => {
    if (isPosted) {
      toggle();
    }
  }, [isPosted]);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs(initialInputs);
    setLat('');
    setLong('');
  };
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const {
        title,
        content,
        maxNum,
        needNum,
        category,
        year,
        month,
        date,
        ampm,
        hours,
        minutes,
        contestCategory,
        subject,
        fare,
        hostOrganization,
        qualification,
        homepage,
        region,
        duration,
        topic,
        projectDuration,
        departure,
        destination,
        gender,
        departHours,
        departMinutes,
      } = inputs;
      console.log('sdf', lat, long);

      const ampmHours = ampm === 'PM' ? parseInt(hours) + 12 : hours;
      const deadLine = `${year}-${month < 10 ? `0${month}` : month}-${
        date < 10 ? `0${date}` : date
      }T${ampmHours < 10 ? `0${ampmHours}` : ampmHours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:00`;
      const deadLineDate = new Date(deadLine);
      let data = {
        writer: username,
        title,
        content,
        deadLine,
        maxNum: parseInt(maxNum),
        curNum: maxNum - needNum,
        category,
      };
      if (category === 'contest') {
        data = {
          ...data,
          contestCategory,
          hostOrganization,
          qualification,
          homepage,
        };
      } else if (category === 'study') {
        data = {
          ...data,
          subject,
          region,
          duration,
        };
      } else if (category === 'carPool') {
        data = {
          ...data,
          fare,
          departure,
          destination,
          gender,
          departTime: {
            hours: departHours,
            minutes: departMinutes,
          },
          lat,
          long,
        };
      } else if (category === 'miniProject') {
        data = {
          ...data,
          topic,
          projectDuration,
        };
      }
      console.log(data);

      if (
        deadLineDate.getTime() <= current.getTime() ||
        isNaN(deadLineDate.getTime())
      ) {
        alert('올바른 날짜를 입력해주세요.');
      } else if (category === 'carPool' && !lat && !long) {
        alert('출발지를 지정 해주세요.'); 
      } else {
        dispatch(addPostRequest(data));
      }
    },
    [isPosted, inputs, lat, long]
  );

  return (
    <div>
      <Button
        color="dark"
        onClick={toggle}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '75%',
          textAlign: 'center',
          margin: '0',
          position: 'absolute',
          bottom: '5%',
          right: '-7%',
        }}
      >
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
        />
        <link rel="stylesheet" href="style.css" />
        <a className="search-btn" href="#">
          <i className="fas fa-pencil-alt" style={{ color: 'white' }} />
        </a>
      </Button>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <WritePostForm
          handleSubmit={handleSubmit}
          toggle={toggle}
          onChange={onChange}
          setLat={setLat}
          setLong={setLong}
          inputs={inputs}
        />
      </Modal>
    </div>
  );
};

export default WritePostModal;
