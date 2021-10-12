import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { Close } from '../../icons';
import { IconButton } from '../icon-button';
import styles from './NewSongDialog.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../input';
import { LoadingButton } from '../loading-button';
import { Select } from '../select';
import { Song, Tempo } from '../../types/songs';
import { useSongsService } from '../../services/songs';

type Props = {
  isOpen: boolean;

  onDismiss: () => void;

  onCreate: (song: Song) => void;
};

type FormInputs = {
  title: string;
  artist: string;
  range: string;
  alternativeRange: string;
  tempo: string;
  key: string;
};

const NewSongDialog: React.FC<Props> = ({ isOpen, onDismiss, onCreate }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, errors, isSubmitting },
  } = useForm<FormInputs>({
    mode: 'onBlur',
  });

  const [rangeValue, tempoValue] = watch(['range', 'tempo']);
  const songsService = useSongsService();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    songsService.createSong(data).then((createdSong) => {
      onCreate(createdSong);
    });
    reset();
    onDismiss();
  };

  return (
    <Dialog
      className={styles.dialog}
      isOpen={isOpen}
      onDismiss={onDismiss}
      aria-label="New Song Dialog"
    >
      <div className={styles.dialog__header}>
        <h2>New Song</h2>
      </div>
      <div className={styles.dialog__body}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            required
            error={errors.title?.message}
            {...register('title', {
              required: {
                value: true,
                message: 'Required',
              },
            })}
          />
          <Input label="Artist" {...register('artist')} />
          <Input
            label="Range"
            type="number"
            error={errors.range?.message}
            {...register('range', {
              pattern: {
                value: /^\d*$/,
                message: 'Please enter a positive integer',
              },
              min: {
                value: 1,
                message: 'Please enter a positive integer',
              },
            })}
          />
          <Input
            label="Alternative Range"
            type="number"
            error={errors.alternativeRange?.message}
            disabled={!rangeValue || Boolean(errors.range)}
            {...register('alternativeRange', {
              pattern: {
                value: /^\d*$/,
                message: 'Please enter a positive integer',
              },
              min: {
                value: 1,
                message: 'Please enter a positive integer',
              },
            })}
          />
          <Select label="Tempo" value={tempoValue || ''} {...register('tempo')}>
            <option value={Tempo.FAST}>Fast</option>
            <option value={Tempo.MEDIUM}>Medium</option>
            <option value={Tempo.SLOW}>Slow</option>
          </Select>
          <Input label="Key" {...register('key')} />
          <LoadingButton
            isLoading={isSubmitting}
            size="large"
            type="submit"
            disabled={!isValid}
          >
            Create
          </LoadingButton>
        </form>
      </div>
      <IconButton
        className={styles['dialog__close-button']}
        label="close"
        onClick={onDismiss}
      >
        <Close />
      </IconButton>
    </Dialog>
  );
};

export default NewSongDialog;
