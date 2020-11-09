import User from './user';

export default interface Target {
  target: string;
  target_id?: string;
  target_type_sig: string;
  target_owner_context: User;
  page_size?: string;
  page_number?: string;
  [x: string]: any;
}
