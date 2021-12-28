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
const { Octokit } = require("@octokit/rest");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { context } = require('@actions/github');
            const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
            const comment = core.getInput('content');
            const reaction = core.getInput('reaction');
            const tag_creator = core.getInput('tag_creator');
            if (typeof GITHUB_TOKEN !== 'string') {
                throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
            }
            const octokit = new Octokit({
                auth: GITHUB_TOKEN
            });
            const { pull_request } = context.payload;
            const payload = context.payload.pull_request;
            const author = payload.user.login;
            const tag_text = (tag_creator ? `@` + author + ` ` : null);
            yield octokit.rest.issues.createComment(Object.assign(Object.assign({}, context.repo), { issue_number: pull_request.number, body: tag_text + comment, id: payload.number.toString() }));
            yield octokit.rest.issues.addAssignees(Object.assign(Object.assign({}, context.repo), { issue_number: pull_request.number, assignees: author }));
            yield octokit.rest.reactions.createForIssue(Object.assign(Object.assign({}, context.repo), { repo: context.repo.repo, issue_number: pull_request.number, content: reaction, owner: context.repo.owner }));
        }
        catch (e) {
            core.error(e);
            core.setFailed(e.message);
        }
    });
}
run();
