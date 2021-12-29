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
require('dotenv').config();
const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { context } = require('@actions/github');
            const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
            const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
            const COMMENT_TEXT = core.getInput('COMMENT_TEXT');
            const searchTerm = core.getInput('searchTerm') || 'thank you';
            const PR_REACTION = core.getInput('PR_REACTION');
            const TAG_AUTHOR = core.getInput('TAG_AUTHOR');
            const ASSIGN_TO_AUTHOR = core.getInput('ASSIGN_TO_AUTHOR');
            if (typeof TENOR_TOKEN !== 'string') {
                throw new Error('Invalid TENOR_TOKEN: did you forget to set it in your action config?');
            }
            if (typeof GITHUB_TOKEN !== 'string') {
                throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
            }
            //gif
            const randomPos = Math.round(Math.random() * 1000);
            const url = `https://api.tenor.com/v1/search?q=${encodeURIComponent(searchTerm)}&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high`;
            const response = yield fetch(`${url}&key=${TENOR_TOKEN}`);
            const { results } = yield response.json();
            const gifUrl = results[0].media[0].tinygif.url;
            const octokit = github.getOctokit(GITHUB_TOKEN);
            const { pull_request } = context.payload;
            const payload = context.payload.pull_request;
            const author = payload.user.login;
            const tag_text = (TAG_AUTHOR ? `@` + author + ` ` : null);
            const assignee = (ASSIGN_TO_AUTHOR ? author : null);
            yield octokit.rest.issues.createComment(Object.assign(Object.assign({}, context.repo), { issue_number: pull_request.number, body: tag_text + COMMENT_TEXT + `\n\n<img src="${gifUrl}" alt="${searchTerm}" />`, id: payload.number.toString() }));
            yield octokit.rest.issues.addAssignees(Object.assign(Object.assign({}, context.repo), { issue_number: pull_request.number, assignees: assignee }));
            yield octokit.rest.reactions.createForIssue(Object.assign(Object.assign({}, context.repo), { repo: context.repo.repo, issue_number: pull_request.number, content: PR_REACTION, owner: context.repo.owner }));
        }
        catch (e) {
            core.error(e);
            core.setFailed(e.message);
        }
    });
}
run();
