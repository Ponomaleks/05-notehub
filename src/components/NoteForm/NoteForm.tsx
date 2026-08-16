import { Formik, Form, Field, ErrorMessage } from 'formik';
import { string, object, ObjectSchema } from 'yup';

import { TagValues, type NewNote, type NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

type NoteFormValues = {
  title: string;
  content?: string;
  tag: NoteTag | '';
};

const NoteFormSchema: ObjectSchema<NoteFormValues> = object({
  title: string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters long')
    .max(50, 'Title must be at most 50 characters long'),
  content: string().max(500, 'Content must be at most 500 characters long'),
  tag: string()
    .oneOf(Object.values(TagValues), 'Invalid tag')
    .required('NoteTag is required'),
});

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: '',
};

interface NoteFormProps {
  onClose: () => void;
  onSubmit: (values: NewNote) => void;
}

const NoteForm = ({ onClose, onSubmit }: NoteFormProps) => {
  const handleSubmit = (values: NoteFormValues) => {
    onSubmit(values as NewNote);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      {({ values }) => (
        <Form className={css.form}>
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Create Note</legend>
            <div className={css.formGroup}>
              <label className={css.label} htmlFor="title">
                Title
              </label>
              <Field
                id="title"
                type="text"
                name="title"
                className={css.input}
              />
              <ErrorMessage
                name="title"
                className={css.error}
                component="span"
              />
            </div>

            <div className={css.formGroup}>
              <label className={css.label} htmlFor="content">
                Content
              </label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
              />
              <ErrorMessage
                name="content"
                className={css.error}
                component="span"
              />
            </div>

            <div className={css.formGroup}>
              <label className={css.label} htmlFor="tag">
                NoteTag
              </label>
              <Field
                as="select"
                id="tag"
                name="tag"
                className={`${css.select} ${!values.tag ? css.placeholderColor : ''}`}
              >
                <option value="" disabled hidden className={css.placeholder}>
                  Choose the tag
                </option>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" className={css.error} component="span" />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={false}
              >
                Create note
              </button>
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
