#!/usr/bin/env python3

import os
import json
import requests


class DataSeeder:
    base_url: str = "http://localhost:5000"
    route_mapper: dict = {"users": "/users/scripts", "jobs": "/jobs/scripts"}

    def __init__(self, data_type: str, dir_path: str, base_url: str = None):
        self.dir_path: str = dir_path.rstrip("/")
        self.file_list: list = DataSeeder.get_files(self.dir_path)
        self.url = self.construct_url(data_type, base_url)

    def construct_url(self, data_type, base_url: str = None) -> str:
        """ Constructing the endpoint url and error handling. """

        if data_type not in self.route_mapper.keys():
            raise Exception(
                "Invalid data type specified. Select either 'users' or 'jobs'."
            )

        return f"{base_url.strip('/') if base_url else self.base_url}{self.route_mapper[data_type]}"  # base url + route

    @staticmethod
    def get_files(dir_path: str) -> list:
        """ Returls an array of file path to JSON files. Raises exception if no JSON files are found. """
        _temp: list = [
            f"{dir_path}/{i}" for i in os.listdir(dir_path) if i.endswith(".json")
        ]

        if not _temp:
            raise Exception("No JSON files found inside the given directory.")
        else:
            return _temp

    @staticmethod
    def load_json(dir_path: str) -> dict:
        """ Loads the json file and returns dictionary.  """

        with open(dir_path, "r") as fin:
            return json.load(fin)

    def post_all_data(self):
        """ Loads all JSON files individually and posts them to the database. """

        for file_path in self.file_list:
            response = requests.post(self.url, json=self.load_json(file_path))


if __name__ == "__main__":

    import argparse

    parser = argparse.ArgumentParser()

    parser.add_argument(
        "data_type", help="Type of data being loaded. Options: [users, jobs]", type=str
    )
    parser.add_argument("dir_path", help="Dir path to the folder.", type=str)
    parser.add_argument(
        "-u",
        "--url",
        help="Base url to the backend services. Optional field. Default value is 'http://localhost:5000'",
        type=str,
        default=None,
    )

    args = parser.parse_args()

    seedman = DataSeeder(args.data_type, args.dir_path, base_url=args.url)

    seedman.post_all_data()
