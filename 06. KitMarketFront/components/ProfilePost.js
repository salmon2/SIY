import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { cancelJoinRequest } from '../data/event/postEvent';

const ProfilePost = ({ postInfo, tab }) => {
  const { id, title, writer, createdAt } = postInfo;

  const dispatch = useDispatch();
  const router = useRouter();

  const { isCancelledJoin } = useSelector((state) => state.post);

  let category = '';
  if (postInfo.category === 'contest') {
    category = '공모전';
  } else if (postInfo.category === 'study') {
    category = '스터디';
  } else if (postInfo.category === 'carPool') {
    category = '카풀/택시';
  } else if (postInfo.category === 'miniProject') {
    category = '미니프로젝트';
  }

  const onClickPost = () => {
    router.push(`/post/${postInfo.category}/${postInfo.id}`);
  };

  const onClickCancel = useCallback(() => {
    if (confirm('신청을 취소하시겠습니까?')) {
      dispatch(cancelJoinRequest({ postId: id }));
      if (isCancelledJoin) {
        alert('취소되었습니다.');
      } else {
        alert('실패하였습니다.');
      }
    }
  }, [postInfo]);

  return (
    <Col xs="3">
      <Card body onClick={onClickPost}>
        <Row>
          <Col xs="8">
            <CardTitle className="text-left">{category}</CardTitle>
          </Col>
          <Col xs="4" className="col text-right">
            {tab === 'applicated' && (
              <Button close onClick={onClickCancel}></Button>
            )}
          </Col>
        </Row>
        <CardTitle tag="h5" className="text-center">
          {title}
        </CardTitle>
        <CardText>{writer}</CardText>
        <br />
        <Row>
          <Col xs="5">
            <CardSubtitle tag="h6" className="mb-2 text-muted ">
              {createdAt.slice(0, 10)}
            </CardSubtitle>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProfilePost;
