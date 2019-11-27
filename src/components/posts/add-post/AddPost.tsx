import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import './AddPost.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, useField, FieldAttributes } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Post } from '../../../store/posts/types';
import { addPost } from '../../../store/posts/actions';

type CustomTextFieldProps = { label: string, multiline?: any } & FieldAttributes<{}>

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, multiline, ...props }) => {
  const [field, meta] = useField<{}>(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <TextField
      { ...field }
      variant="outlined"
      fullWidth
      multiline={multiline}
      margin="normal"
      label={label}
      helperText={errorText}
      error={!!errorText}
    />
  )
}

interface Props extends RouteComponentProps<any> {
  onAddPost: (post: Post) => any
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddPost: (post: Post) => dispatch(addPost(post))
  }
}

class AddPost extends Component<Props> {
  state = { open: false }

  openDialog() {
    this.setState({ ...this.state, open: true })
  }

  closeDialog() {
    this.setState({ ...this.state, open: false })
  }

  render() {
    return (
      <div>
        <div onClick={ () => this.openDialog() } className="add-post__wrapper">
          <Button>
            <Icon color="primary">add_circle</Icon>
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={() => this.closeDialog()}
          aria-labelledby="alert-dialog-title"
          >
          <DialogTitle id="alert-dialog-title">Add Post</DialogTitle>
          <DialogContent>
            <Formik 
            initialValues={{ title: '', body: '' }}
            validate={(values) => {
              const errors: Record<string, string> = {}

              if (!values.title) {
                errors.title = 'This field is required'
              }

              if(values.body.length < 20) {
                errors.body = 'This field should contain at least 20 characters'
              }

              return errors
            }}
            onSubmit={(data) => {
              const { title, body } = data
              const post: Post = {
                userId: this.props.match.params.id,
                title,
                body
              }
              console.log('post', post);
              this.props.onAddPost(post)
              this.closeDialog()
            }}>
              {() => (
              <Form>
                <CustomTextField name="title" type="text" label="Title" />
                <CustomTextField name="body" type="text" label="Body" multiline />
                <div className="form__buttons">
                  <Button onClick={ () => this.closeDialog() } color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </div>
              </Form>
              )}
             </Formik>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AddPost))