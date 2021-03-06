"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = require('@actions/core');
const github = require('@actions/github');
const camelCase = require('camelcase');
const axios_1 = __importDefault(require("axios"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { context } = require('@actions/github');
            //taking input from the core
            const GIPHY_TOKEN = core.getInput('GIPHY_TOKEN');
            const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
            const COMMENT_TEXT = core.getInput('COMMENT_TEXT');
            const PR_REACTION = core.getInput('PR_REACTION');
            const TAG_AUTHOR = core.getInput('TAG_AUTHOR');
            const ASSIGN_TO_AUTHOR = core.getInput('ASSIGN_TO_AUTHOR');
            const GIPHY_TOPIC = camelCase(core.getInput('GIPHY_TOPIC'));
            const FIRST_TIMERS_MESSAGE = core.getInput('FIRST_TIMERS_MESSAGE');
            if (typeof GITHUB_TOKEN !== 'string') {
                throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
            }
            //fetch GIF from GIPHY
            const response = yield axios_1.default.get(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_TOKEN}&tag=${GIPHY_TOPIC}`);
            const gifUrl = response.data.data.images.fixed_height_small.url;
            const gif = `\n\n![thanks](${gifUrl})`;
            const octokit = github.getOctokit(GITHUB_TOKEN);
            const { pull_request } = context.payload;
            const payload = context.payload.pull_request;
            const author = payload.user.login;
            const creator = context.payload.sender.login;
            const tag_text = TAG_AUTHOR ? `@` + author + ` ` : null;
            const assignee = ASSIGN_TO_AUTHOR ? author : null;
            //comment on PR
            yield octokit.rest.issues.createComment(Object.assign(Object.assign({}, context.repo), { issue_number: pull_request.number, body: tag_text + COMMENT_TEXT + gif, id: payload.number.toString() }));
            //assign PR to its author
            yield octokit.rest.issues.addAssignees(Object.assign(Object.assign({}, context.repo), { issue_number: pull_request.number, assignees: assignee }));
            //add reaction to PR
            yield octokit.rest.reactions.createForIssue(Object.assign(Object.assign({}, context.repo), { repo: context.repo.repo, issue_number: pull_request.number, content: PR_REACTION, owner: context.repo.owner }));
            //for first timers
            const pulls = yield octokit.rest.pulls.list(Object.assign(Object.assign({}, context.repo), { state: 'all', sort: 'created', direction: 'desc' }));
            console.log('Checking...');
            if (pulls.data.length === 1) {
                console.log('First pull request!');
                yield octokit.rest.issues.createComment(Object.assign(Object.assign({}, context.repo), { issue_number: pull_request.number, body: FIRST_TIMERS_MESSAGE, id: payload.number.toString() }));
            }
            else {
                console.log('Not first pull request');
            }
        }
        catch (e) {
            core.error(e);
            core.setFailed(e.message);
        }
    });
}
exports.run = run;
