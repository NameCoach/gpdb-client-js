interface Location {
  country: string;
  state: string;
  city: string;
  street: string;
}

export default interface User {
  signature: string;
  phone?: string;
  email?: string;
  hedb_owne_ids?: Array<string>;
  location?: Location;
  native_languages?: Array<string>;
  spoken_languages?: Array<String>;
  [x: string]: any;
}
