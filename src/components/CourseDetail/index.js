import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Card,
  Chip,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import restClient from '../../lib/restClient';
import Loader from '../Loader';



const styles = theme => ({
  courseCard: {
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
    '& p': {
      margin: '10px 0px'
    }
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      course: {}
    };
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.hasSubscribed = this.hasSubscribed.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.finishUpload = this.finishUpload.bind(this);
  }

  async componentDidMount() {
    try {
      const { id } = this.props;
      const response = await restClient().get(`courses/${id}`);
      this.setState({ course: response.data, loaded: true });
    } catch (err) {}
  }

  finishUpload(coverImage) {
    this.setState((state) => {
      const updated = state;
      // update course CoverImage
      updated.course.CoverImage = coverImage;
      return updated;
    });
  }

  displayTag(tags) {
    if (!tags || !tags.length) return null;
    const { classes } = this.props;
    return tags.split(',').map(tag => {
      const label = tag.trim();
      return <Chip label={label} key={label} className={classes.chip} />;
    });
  }

  async subscribe() {
    try {
      const { course } = this.state;
      await restClient().post('subscriptioncourses', {
        StudentId: localStorage.getItem('uid'),
        CourseId: course.CourseId,
        SubscriptionStatus: 1
      });
      window.location.reload();
    } catch (err) {}
  }

  hasSubscribed() {
    const { course } = this.state;
    const uid = localStorage.getItem('uid');
    return course.StudentIds && course.StudentIds.includes(uid && uid.toUpperCase());
  }

  async unsubscribe() {
    try {
      const { course } = this.state;
      const uid = localStorage.getItem('uid');
      await restClient().put(`subscriptioncourses/${uid && uid.toUpperCase()}`, {
        CourseId: course.CourseId,
        SubscriptionStatus: 0
      });
      window.location.reload();
    } catch (err) {}
  }

  async deleteCourse() {
    try {
      const { course } = this.state;
      await restClient().delete(`courses/${course.CourseId}`);
      const { history } = this.props;
      history.push('/');
    } catch (err) {}
  }

  getActions(user) {
    if (_.isEmpty(user)) return null;

    if (user.Role === 'Instructor') {
      return (
        <Button size="small" color="primary" onClick={this.deleteCourse}>
          Delete this course
        </Button>
      );
    }


    if (this.hasSubscribed()) {
      return (
        <Button size="small" color="primary" onClick={this.unsubscribe}>
          Unsubscribe
        </Button>
      );
    } 
    return (
      <Button size="small" color="primary" onClick={this.subscribe}>
        Subscribe
      </Button>
    );
  }

  redirectAllCourses = () => {
    const { history } = this.props;
    history.push('/');
  }
  
  render() {
    const { classes, user } = this.props;
    const { course, loaded } = this.state;
    if (!loaded) return <Loader />;

    return (
      <div style={{ marginTop: 20, paddingTop: 30, maxWidth: 1000, margin: '0 auto' }}>
        <Card className={classes.courseCard}>
          {course.CoverImage && (
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              image={course.CoverImage}
              title="Contemplative Reptile"
            />
          )}
          
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {course.CourseName}
            </Typography>
            <Typography gutterBottom variant="h4" component="h4">
              {course.SubTitle}
            </Typography>

            <Typography component="p">Course Code: {course.CourseCode}</Typography>
            <Typography component="p">Brief: {course.CourseBrief}</Typography>

            <Typography component="p">Course Duration: {course.CourseDuration} minutes</Typography>

            <Typography component="p">Target Audience: {course.TargetAudiences}</Typography>

            <Typography component="p">Course Detail: {course.CourseDetails}</Typography>

            <Typography component="p">Knowledge Points: {course.KnowledgePoints}</Typography>

            <Typography component="p">
              Start Date: {moment(course.JoinDate).format('YYYY-MM-DD')}
            </Typography>

            {this.displayTag(course.CourseTags)}

            {!_.isEmpty(user) && this.hasSubscribed() && (
              <Typography>Subscribed already</Typography>
            )}

           

          </CardContent>

          <CardActions>
            {this.getActions(user)}

            <Button size="small" color="primary" onClick={this.redirectAllCourses}>
              All Courses
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(CourseDetail);
