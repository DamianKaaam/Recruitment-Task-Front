import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, useField, FieldAttributes } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Comment } from '../../../store/comments/types';
import { addComment, getComments } from '../../../store/comments/actions';
import { AppState } from '../../../store';

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
  showComments: boolean
  onGetComments: (postId: number) => any
  onAddComment: (comment: Comment) => any
}

const mapStateToProps = (state: AppState) => {
  const { showComments } = state.comments
  return { showComments }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetComments: (postId: number) => dispatch(getComments(postId)),
    onAddComment: (comment: Comment) => dispatch(addComment(comment))
  }
}

class AddComment extends Component<Props> {
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
        <div onClick={ () => this.openDialog() } className="add-comment__wrapper">
          <Button>
            Add Comment
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={() => this.closeDialog()}
          aria-labelledby="alert-dialog-title"
          >
          <DialogTitle id="alert-dialog-title">Add Comment</DialogTitle>
          <DialogContent>
            <Formik 
            initialValues={{ name: '', email: '', body: '' }}
            validate={(values) => {
              const errors: Record<string, string> = {}

              if (!values.name) {
                errors.name = 'This field is required'
              }

              if (!values.email) {
                errors.email = 'This field is required'
              }

              const emailRegExp: RegExp = /\S+@\S+\.\S+/
              if (!emailRegExp.test(values.email)) {
                errors.email = 'Invalid email format'
              }

              if(!values.email) {
                errors.body = 'This field is required';
              }

              return errors
            }}
            onSubmit={(data) => {
              const { name, email, body } = data
              const { match, showComments, onGetComments, onAddComment } = this.props

              const comment: Comment = {
                postId: match.params.id,
                name,
                email,
                body
              }

              if (!showComments) {
                onGetComments(match.params.id)
              }
              onAddComment(comment)
              this.closeDialog()
            }}>
              {() => (
              <Form>
                <CustomTextField name="name" type="text" label="Name" />
                <CustomTextField name="email" type="email" label="Email" />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddComment)) 