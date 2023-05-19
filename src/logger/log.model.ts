import { model, Schema } from 'mongoose';

interface ILogModel extends Document {
  type: number,
  message: string,
  label: string,
  time: Date,
}

const LogSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const Log = model<ILogModel>('Log', LogSchema);

export default Log;
